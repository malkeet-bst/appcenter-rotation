import React from "react";
import { connect } from "react-redux";

import request from "superagent";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu'
import Select from 'react-select'
import NavBar from "./NavBar";

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
class NewRotation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: null,
      selectedAction: '',
      menuBar: false
    }

  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({ menuBar: true })
    console.log(`Option selected:`, selectedOption);
  }
  handleActionChange = (selectedAction) => {
    this.setState({ selectedAction });
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
  submitted = () => {
    console.log('done', document.getElementById('game_name'))
  }
  render() {
    const { selectedOption, menuBar, selectedAction } = this.state;
    return <div className="new-rotation container">
      <NavBar page="New" />
      <h2>New Rotation</h2>
      <form className="new-form form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3">Game Name</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Game Name</label>
          <div id="game_name" className="col-sm-9 multi-select">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3">Package Name</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="pwd" name="pwd" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Action</label>
          <div className="col-sm-9">
            <Select
              value={selectedAction}
              onChange={this.handleActionChange}
              options={actionOptions}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Partner</label>
          <div className="col-sm-9 multi-select">
            <Select
              value={selectedOption}
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
            <input className="checkbox" type="checkbox" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Upload image</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" />
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
            <input type="text" className="form-control" placeholder='0' />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Download url</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <input type="button" onClick={this.submitted} className="btn btn-primary" value="Submit"/>
          </div>
        </div>
      </form>
    </div>;
  }
}


export default NewRotation;
