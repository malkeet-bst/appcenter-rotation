import FluxApp from "../utils/FluxApp";
import GlobalActions from "../actions/GlobalActions";
import Utils from "../utils/util";

export class RotationStore {
         constructor() {
           window.RotationStore = this;
           this.rotationData = null;
           this.partnerList = null;
           this.apiStatus = null;
           this.currentView='home'
           this.apiUrl = Utils.getUrlFromInstance(Utils.getCloudInstance());
           this.bindActions(GlobalActions);
           window.RotationStore = this;
         }

         onSetCurrentView(view) {
           this.currentView = view;
           this.apiStatus = null;
         }
         onSetSelectedPartner = partner => {
           this.selectedPartner = partner;
         };

         async onFetchRotationData(partner) {
           let url = `${this.apiUrl}rotation_cms`;
           if (partner) {
             this.selectedPartner = partner;
             url = `${this.apiUrl}rotation_cms?partner=${partner}`;
           }
           this.apiStatus = "loading";
           let response = await fetch(url, {
             headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
             }
           });
           if (response && (response.status === 200 || response.status === 304)) {
             let user = await response.json();
             if (user && user.rotation) {
               this.apiStatus = null;
               this.rotationData = user.rotation;
               this.partnerList = user.partner_all;
             }
           } else {
             this.apiStatus = "error";
           }
           this.emitChange();
         }

         async onDeleteRotationBanner(data) {
           this.apiStatus = "loading";
           let rId = data[1];
           data = { rotation_id: rId.toString(), partner: data[0] };
           var formBody = [];
           for (var property in data) {
             var encodedKey = encodeURIComponent(property);
             var encodedValue = encodeURIComponent(data[property]);
             formBody.push(encodedKey + "=" + encodedValue);
           }
           formBody = formBody.join("&");

           let response = await fetch(
             `${this.apiUrl}rotation_cms/delete`,
             {
               method: "post",
               headers: {
                 "Content-Type":
                   "application/x-www-form-urlencoded;charset=UTF-8"
               },
               body: formBody
             }
           );
           if (response && (response.status === 200 || response.status === 304)) {
             let user = await response.json();
             if (user && user.success) {
               this.onFetchRotationData(this.selectedPartner);
             }
           } else {
             this.apiStatus = "error";
           }
           this.emitChange();
         }
         async onAddRotation(data) {
           this.apiStatus = "loading";
           if (data && data.image_file) {
             data.image_url = "";
           }
           var fd = new FormData();
           for (var property in data) {
             fd.append(property, data[property]);
           }
           let response = await fetch(`${this.apiUrl}rotation_cms/add`, {
             method: "post",
             headers: {
               // "Content-Type": "multipart/form-data",
               Accept: "application/json"
               //  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
             },
             body: fd
           });

           if (response && (response.status === 200 || response.status === 304)) {
             let user = await response.json();
             if (user && user.success) {
               if (!user.message) this.apiStatus = { success: "data added successfully" };
               else this.apiStatus = { error: user.message };
             } else {
               this.apiStatus = { error: user.message };
             }
           } else {
             this.apiStatus = { error: "some error occured" };
           }
           this.emitChange();
         }
         async onUpdateRotation(formData) {
           debugger
           let data = {};
           Object.assign(data, formData);
           this.apiStatus = "loading";
           if (data && data.image_file) {
             data.image_url = "";
           }
           if (data.action) {
             data.action = data.action.value 
           }
           var fd = new FormData();
           for (var property in data) {
             fd.append(property, data[property]);
           }
           let response = await fetch(
             `${this.apiUrl}rotation_cms/edit`,
             {
               method: "post",
               headers: {
                 Accept: "application/json"
               },
               body: fd
             }
           );
           if (response && (response.status === 200 || response.status === 304)) {
             let user = await response.json();
             if (user && user.success) {
               if (!user.message) this.apiStatus = { success: "data added successfully" };
               else this.apiStatus = { error: user.message };
             } else {
               this.apiStatus = { error: user.message };
             }
           } else {
             this.apiStatus = { error: "some error occured" };
           }
           this.emitChange();
         }
       }

export default FluxApp.instance.createStore(RotationStore, "RotationStore");
