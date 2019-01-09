import React from "react";
import NavBar from "./NavBar"
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
import Select from 'react-select'

const options = [
  { value: 'vn', label: 'vn' },
  { value: 'in', label: 'in' },
  { value: 'us', label: 'us' }
];
const actionOptions = [
  { value: 'appcenter_details', label: 'appcenter_details' },
  { value: 'download', label: 'download' },
  { value: 'open_in_browser', label: 'open_in_browser' },
  { value: 'open_in_emulator', label: 'open_in_emulator' }
];
class EditRotation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedPartner: null,
      isGoing: false,
      selectedAction: '',
      menuBar: false,
      data: {
        rotation_id: '',
        game_name: '',
        package_name: 'coc',
        action: [{ value: 'download', label: 'download' }],
        sticky: false,
        image_url: 'http://',
        partner: [{ value: 'vn', label: 'vn' }, { value: 'in', label: 'in' }],
        order: 1,
        download_url: 'http://download'
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount = () => {
    const { data } = this.props.location.state
    this.setState({ data: data })
  }
  handleChange = (selectedPartner) => {
    let data = this.state.data
    data.partner = selectedPartner
    this.setState({ data: data });
  }
  handleActionChange = (selectedAction) => {
    let data = this.state.data
    data.action = selectedAction
    this.setState({ data: data });
  }
  openMenu = () => {
    this.setState({ menuBar: true })
  }
  closeMenu = () => {
    this.setState({ menuBar: false })
  }
  uploadImage = () => {
    console.log('upload image')
  }
  updatevalue = (name, event) => {

    let data = this.state.data
    data[name] = event.target.value
    this.setState(
      { varData: data }
    );
  }
  handleInputChange = (event) => {
    let data = this.state.data
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    data.sticky = value
    this.setState({
      data: data
    });
  }

  submitForm = (event) => {

    console.log(this.state.data)
    this.props.history.push("/");

  }

  render() {
    let { menuBar, data } = this.state;

    console.log(data.partner)
    return <div className="new-rotation container">
      <NavBar page="Edit" />
      <h2>Horizontal form</h2>
      <form className="new-form form-horizontal" onSubmit={this.submitForm}>
        <div className="form-group">
          <label className="control-label col-sm-3">Order Id</label>
          <div className="col-sm-9">
            <input type="text" onChange={this.updatevalue.bind(this, 'rotation_id')} className="form-control" value={data.rotation_id} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Game Name</label>
          <div id="game_name" className="col-sm-9 multi-select">
            <input type="text" onChange={this.updatevalue.bind(this, 'game_name')} className="form-control" value={data.game_name} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3">Package Name</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" onChange={this.updatevalue.bind(this, 'package_name')} value={data.package_name} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Action</label>
          <div className="col-sm-9">
            <Select
              value={data.action}
              onChange={this.handleActionChange}
              options={actionOptions}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Partner</label>
          <div className="col-sm-9 multi-select">
            <Select
              value={data.partner}
              onChange={this.handleChange}
              onMenuOpen={this.openMenu}
              onMenuClose={this.closeMenu}
              menuIsOpen={menuBar}
              options={options}
              isMulti="true"
              isSearchable="true"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Sticky App</label>
          <div className="col-sm-9">
            <input className="checkbox" type="checkbox" checked={data.isGoing}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Upload image</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" onChange={this.updatevalue.bind(this, 'image_url')} value={data.image_url} />
          </div>
          <div className="col-sm-3">
            <button type="button" onClick={this.uploadImage} className="btn btn-info btn-md ">
              <span> Upload Image</span>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">order</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" onChange={this.updatevalue.bind(this, 'order')} value={data.order} placeholder='0' />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Download url</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" onChange={this.updatevalue.bind(this, 'download_url')} value={data.download_url} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>;
  }
}


export default EditRotation;
