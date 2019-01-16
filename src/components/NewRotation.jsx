import React from "react";
import If from "./common/If";
import Select from "react-select";
import NavBar from "./NavBar";
import GlobalActions from "../actions/GlobalActions";
import RotationStore from "../store/RotationStore";

const actionOptions = [
  { value: "appcenter_details", label: "appcenter_details" },
  { value: "download", label: "download" },
  { value: "open_in_browser", label: "open_in_browser" },
  { value: "open_in_emulator", label: "open_in_emulator" }
];
class NewRotation extends React.Component {
  constructor(props, context) {
    super(props, context);

    let partnerList = RotationStore.partnerList;
    this.state = {
      savingData: null,
      apiStatus: null,
      showCloseImageIcon: false,
      newData: {
        id: "",
        game_name: "",
        package_name: "",
        action: "",
        sticky_app: false,
        parameter: "",
        title: "",
        image_url: "",
        selectedFile: null,
        partner: "",
        order: "",
        download_url: ""
      },
      partnerList: partnerList
    };
  }
  componentDidMount = () => {
    const { data } = this.props;
    let partnerList = [];
    if (data) {
      data.forEach(partner => {
        partnerList.push({ value: partner, label: partner });
      });
      this.setState({ partnerList });
    }

    RotationStore.listen(this.onChange);

  };
  onChange = () => {
    this.setState({ apiStatus: RotationStore.state.apiStatus });
  };
  componentWillMount = () => {
    GlobalActions.fetchRotationData.defer();
  };


  componentWillUnmount = () => {
    RotationStore.unlisten(this.onChange);
  };
  uploadImage = event => {

    let { newData } = this.state;
    newData.image_file = event.target.files[0];
    this.setState({ newData: newData, showCloseImageIcon: true });
    this.setImgPreview(event)
  };
  setImgPreview = (input) => {
    if (input && input.target && input.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('uploadedImage').setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }
  removeImage = () => {
    let { newData } = this.state;
    document.getElementById('uploadedImage').setAttribute("src", '');
    document.getElementById('imageUploader').value = ''
    newData.image_file = '';
    this.setState({ newData: newData, showCloseImageIcon: false });
  }
  onPartnerSelect = selectedPartner => {
    let newData = this.state.newData;

    let partnerList = [];
    selectedPartner.forEach(item => {
      partnerList.push(item.value);
    });
    newData.partner = partnerList;
    this.setState({ selectedPartner, newData, menuBar: true }); // menuBar to stop auto close dropdown after selecting one partner
  };
  handleInputChange = event => {
    let data = this.state.newData;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    data.sticky_app = value;
    this.setState({
      newData: data
    });
  };
  updatevalue = (name, event) => {
    let newData = this.state.newData;
    newData[name] = event.target.value;
    this.setState({ newData });
  };
  handleActionChange = selectedAction => {
    let newData = this.state.newData;
    newData.action = selectedAction.value;
    this.setState({ selectedAction, newData });
  };
  openMenu = () => {
    this.setState({ menuBar: true });
  };
  closeMenu = () => {
    this.setState({ menuBar: false });
  };

  onFormSubmit = () => {
    GlobalActions.addRotation.defer(this.state.newData);
  };
  render() {
    const {
      selectedPartner,
      menuBar,
      selectedAction,
      partnerList,
      apiStatus, newData,
      showCloseImageIcon
    } = this.state;
    return (
      <div className="new-rotation container">
        <NavBar page="New" />
        <h2>New Rotation</h2>

        <If condition={apiStatus != null && apiStatus.success != null}>
          <div className="alert alert-success">
            <strong>Success!</strong> {apiStatus && apiStatus.success}
          </div>
        </If>
        <If condition={apiStatus != null && apiStatus.error != null}>
          <div className="alert alert-danger">
            <strong>Failed!</strong> {apiStatus && apiStatus.error}
          </div>
        </If>
        <form className="new-form form-horizontal">
          {/* <div className="form-group">
            <label className="control-label col-sm-3">Game Name</label>
            <div id="game_name" className="col-sm-9 multi-select">
              <input
                type="text"
                onChange={this.updatevalue.bind(this, "game_name")}
                className="form-control"
              />
            </div>
          </div> */}

          <div className="form-group required">
            <label className="control-label col-sm-3 ">Package Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                onChange={this.updatevalue.bind(this, "package_name")}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group required">
            <label className="control-label col-sm-3">Action</label>
            <div className="col-sm-9">
              <Select
                value={selectedAction}
                onChange={this.handleActionChange}
                options={actionOptions}
              />
            </div>
          </div>
          <If condition={newData.action === 'open_in_emulator'}>
            <div className="form-group required">
              <label className="control-label required col-sm-3">Title</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={this.updatevalue.bind(this, "title")}
                  className="form-control"
                />
              </div>
            </div>
          </If>
          <If condition={newData.action === 'open_in_emulator' || newData.action === 'open_in_browser'}>
            <div className="form-group required">
              <label className="control-label col-sm-3">Parameter</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={this.updatevalue.bind(this, "parameter")}
                  className="form-control"
                />
              </div>
            </div>
          </If>
          <div className="form-group required">
            <label className="control-label col-sm-3">Partner</label>
            <div className="col-sm-9 multi-select">
              <Select
                value={selectedPartner}
                onChange={this.onPartnerSelect}
                onMenuOpen={this.openMenu}
                onMenuClose={this.closeMenu}
                menuIsOpen={menuBar}
                options={partnerList}
                isMulti="true"
                isSearchable="true"
                withAll={true}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3">Sticky App</label>
            <div className="col-sm-9">
              <input
                className="checkbox"
                type="checkbox"
                checked={this.state.newData.sticky_app}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="form-group required">
            <label className="control-label col-sm-3">Upload image</label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                onChange={this.updatevalue.bind(this, "image_url")}
              />
              <img style={{ 'height': '137px', 'marginTop': '12px' }} src={newData.image_url} alt="" />
            </div>
            <div className="col-sm-3">
              <input type="file" name="" id="imageUploader" onChange={this.uploadImage} />
              <img style={{ 'height': '137px', 'marginTop': '12px' }} id="uploadedImage" src="#" alt="" />
              <If condition={showCloseImageIcon}>
                <button style={{ 'position': 'absolute', 'right': '0px' }} type="button" onClick={this.removeImage} className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </If>
            </div>
          </div>
          <div className="form-group required">
            <label className="control-label col-sm-3">order</label>
            <div className="col-sm-9">
              <input
                type="text"
                onChange={this.updatevalue.bind(this, "order")}
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>
          {/* <div className="form-group">
            <label className="control-label col-sm-3">Download url</label>
            <div className="col-sm-9">
              <input
                type="text"
                onChange={this.updatevalue.bind(this, "download_url")}
                className="form-control"
              />
            </div>
          </div> */}

          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <input
                type="button"
                onClick={this.onFormSubmit}
                className="btn btn-primary"
                value="Submit"
              />
            </div>
          </div>
        </form>
        <If condition={apiStatus == 'loading'}>
          <div className="page-loader" />
        </If>

      </div>
    );
  }
}

export default NewRotation;
