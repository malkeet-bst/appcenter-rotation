import React from "react";
import NavBar from "./NavBar";
import GlobalActions from "../actions/GlobalActions";
import Select from "react-select";
import RotationStore from "../store/RotationStore";
import If from "./common/If";

const actionOptions = [
  { value: "appcenter_details", label: "appcenter_details" },
  { value: "download", label: "download" },
  { value: "open_in_browser", label: "open_in_browser" },
  { value: "open_in_emulator", label: "open_in_emulator" }
];
class EditRotation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedPartner: null,
      selectedAction: "",
      disableForm: false,
      apiStatus: null,
      formData: {
        id: "",
        game_name: "",
        package_name: "",
        action: [{ value: "download", label: "download" }],
        sticky_app: false,
        parameter: "",
        title: "",
        image_url: "",
        selectedFile: null,
        partner: "",
        order: "",
        download_url: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onChange = () => {
    this.setState({ apiStatus: RotationStore.state.apiStatus });
  };
  componentWillMount = () => {
    GlobalActions.fetchRotationData.defer();
  };
  componentDidMount = () => {
    const { data } = this.props;
    let formData = {};
    Object.assign(formData, data);
    
    if(data){
      formData.action = [{ value: data.action, label: data.action }];
      this.setState({ formData: formData });
    }
   
    RotationStore.listen(this.onChange);
  };

  componentWillUnmount = () => {
    RotationStore.unlisten(this.onChange);
  };

  handleChange = selectedPartner => {
    let data = this.state.formData;
    data.partner = selectedPartner;
    this.setState({ formData: data });
  };
  handleActionChange = selectedAction => {
    let data = this.state.formData;
    data.action = selectedAction;
    this.setState({ formData: data });
  };
  uploadImage = event => {
    let data = this.state.formData;
    data.image_file = event.target.files[0];
    this.setState({ formData: data });
  };
  deleteUploadedImage = () => {
    let data = this.state.formData;
    data.image_file = "";
    this.setState({ formData: data });
  };
  updatevalue = (name, event) => {
    let data = this.state.formData;
    data[name] = event.target.value;
    this.setState({ formData: data });
  };
  handleInputChange = event => {
    let data = this.state.formData;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    data.sticky_app = value;
    this.setState({
      formData: data
    });
  };

  onFormSubmit = event => {
    GlobalActions.updateRotation(this.state.formData);
    //this.props.history.push("/");
  };

  render() {
    let { apiStatus, formData } = this.state;
    return (
      <div className="new-rotation container">
        <NavBar page="Edit" />
        <h2>Horizontal form</h2>
        <If condition={apiStatus!=null && apiStatus.success !=null}>
          <div className="alert alert-success">
            <strong>Success!</strong> {apiStatus && apiStatus.success}
          </div>
        </If>
        <If condition={apiStatus != null && apiStatus.error !=null}>
          <div className="alert alert-danger">
            <strong>Failed!</strong> {apiStatus && apiStatus.error}
          </div>
        </If>
        <form className="new-form form-horizontal">
          <fieldset disabled={this.state.disableForm}>
            <div className="form-group">
              <label className="control-label col-sm-3">Order Id</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  disabled
                  onChange={this.updatevalue.bind(this, "id")}
                  className="form-control"
                  value={formData.id}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Game Name</label>
              <div id="game_name" className="col-sm-9 multi-select">
                <input
                  type="text"
                  onChange={this.updatevalue.bind(this, "game_name")}
                  className="form-control"
                  value={formData.game_name}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="control-label col-sm-3">Package Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  disabled
                  className="form-control"
                  onChange={this.updatevalue.bind(this, "package_name")}
                  value={formData.package_name}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Action</label>
              <div className="col-sm-9">
                <Select
                  value={formData.action}
                  onChange={this.handleActionChange}
                  options={actionOptions}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Partner</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  disabled
                  className="form-control"
                  value={formData.partner}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Sticky App</label>
              <div className="col-sm-9">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={formData.sticky_app}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Parameter</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.updatevalue.bind(this, "parameter")}
                  value={formData.parameter}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Title</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.updatevalue.bind(this, "title")}
                  value={formData.title}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Upload image</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.updatevalue.bind(this, "image_url")}
                  value={formData.image_url}
                />
                <img style={{'height':'137px','marginTop':'12px'}} src={formData.image_url} alt="" />
              </div>
              <div className="col-sm-3">
                <input type="file" name="" id="" onChange={this.uploadImage} />
                {/* <button type="button" onClick={this.deleteUploadedImage} className="btn btn-info btn-md ">
              <span> Remove</span>
            </button> */}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">order</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.updatevalue.bind(this, "order")}
                  value={formData.order}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Download url</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.updatevalue.bind(this, "download_url")}
                  value={formData.download_url}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <input
                  type="button"
                  onClick={this.onFormSubmit}
                  className="btn btn-primary"
                  value="Save"
                />
              </div>
            </div>
          </fieldset>
        </form>
        <If condition={apiStatus == "loading"}>
          <div className="loading" />
        </If>
      </div>
    );
  }
}

export default EditRotation;
