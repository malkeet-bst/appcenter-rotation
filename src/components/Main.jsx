import React from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import Utils from '../utils/util'
import BsIcon from "../images/bluestack_icon.png";
import RotationStore from "../store/RotationStore";
import GlobalActions from "../actions/GlobalActions";
import If from "./common/If";

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getUpdatedState();
  }

  componentWillMount = () => {
    let {selectedPartner}=this.state.RotationS
    if(selectedPartner != null){
      GlobalActions.fetchRotationData.defer(selectedPartner);
    }else
    GlobalActions.fetchRotationData.defer();
  };

  getUpdatedState = () => {
    return {
      showRows: 10,
      RotationS: RotationStore.getState()
    };
  };

  onChange = () => {
    this.setState(this.getUpdatedState());
  };

  componentDidMount = () => {
    RotationStore.listen(this.onChange);
  };

  componentWillUnmount = () => {
    RotationStore.unlisten(this.onChange);
  };
  deleteClicked = (id) => {
    confirmAlert({
      title: ` Rotation id ${id}`,
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => this.deleteRow(id)
        },
        {
          label: 'No'
        }
      ]
    })
  };
  viewRotation = () => {
    let partner = document.getElementById("selectedPartner").value;
    GlobalActions.fetchRotationData.defer(partner);
  };
  setPartner = () => {
    let partner = document.getElementById("selectedPartner").value;
    GlobalActions.fetchRotationData.defer(partner);
  }
  deleteRow = id => {
    let partner = document.getElementById("selectedPartner").value;
    GlobalActions.deleteRotationBanner.defer(partner, id);
  };
  filterData = () => {
    this.setState({
      showRows: parseInt(document.getElementById("filterData").value)
    });
  };
  render() {
    let { rotationData, apiStatus, partnerList,selectedPartner } = this.state.RotationS;
    let dashboardUrl=Utils.getUrlFromInstance(Utils.getCloudInstance())
    if (this.state.showRows && rotationData) {
      let number = this.state.showRows;
      rotationData = rotationData.slice(0, number);
    }
    let rowData = null;
    let partnerOptions = null;
    if (partnerList) {
      partnerOptions = partnerList.map((data, index) => (
        <option key={index} value={data}>
          {data}
        </option>
      ));
    }
    if (rotationData) {
      rowData = rotationData.map((data, index) => (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.package_name}</td>
          <td>{data.game_name}</td>
          <td>{data.action}</td>
          <td>
            <img
              style={{ height: "80px" }}
              src={data.image_url}
              alt={data.image_url}
            />
          </td>
          <td>{data.order}</td>
          <td>{data.uptime}</td>
          <td><a href={data.download_url} >{data.download_url}</a></td>
          <td>{data.sticky_app ? "true" : "false"}</td>
          <td>{data.parameter}</td>
          <td>{data.title}</td>
          <td>
            <div className="row-actions">
              <Link
                to={{ pathname: "/edit", state: { data: rotationData[index] } }}
              >
                Edit
              </Link>
              <Link to="/" onClick={() => this.deleteClicked(data.id)}>
                Delete
              </Link>
            </div>
          </td>
        </tr>
      ));
    }
    return (
      <div className="main">
        <If condition={apiStatus == 'loading'}>
          <div className="loading" />
        </If>
        <If condition={apiStatus=='error'}>
        <div className="alert alert-danger">
            <strong>Some Error occured!</strong>
          </div>
        </If>
        <If condition={rotationData != null}>
          <div className="home-nav">
            <a href={`${dashboardUrl}`}>Dashboard </a>
            <span className="nav-new-rotation">/ Bluestacks Rotation</span>
          </div>
          <div className="heading">
            <div className="icon-container">
              <img className="icon" src={BsIcon} alt="" />
              <h2> Bluestacks Rotation</h2>
            </div>
            <Link
              className="btn btn-primary btn-md glyphicon-plus"
              to={{ pathname: "/new", state: { data: partnerList } }}
            >
              &nbsp; New Rotation
            </Link>
          </div>
          <div className="filter-data">
            <div className="form-group">
              <label>Show Enteries</label>
              <select
                id="filterData"
                className="custom-dropdown"
                defaultValue="10"
                onChange={this.filterData}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">50</option>
              </select>
              <input
                type="text"
                style={{ visibility: "hidden" }}
                className="form-control"
                id="text"
              />
            </div>

            <div className="view">
              <label> View Rotation</label>
              <select className="custom-dropdown" onChange={this.setPartner} id="selectedPartner" value={`${selectedPartner}`}>
                {partnerOptions}
              </select>
              {/* <button
                type="button"
                onClick={this.viewRotation}
                className="btn btn-info btn-md"
              >
                <span> View</span>
              </button> */}
              <If condition={apiStatus == 'loading'}>
                <div className="loading"></div>
              </If>
            </div>
          </div>
          <table className="rotation-table table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>package_name</th>
                <th>game_name</th>
                <th>action</th>
                <th>image_url</th>
                <th>Order</th>
                <th>uptime</th>
                <th>download_url</th>
                <th>sticky app</th>
                <th>parameter</th>
                <th>title</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>{rowData}</tbody>
          </table>
        </If>
      </div>
    );
  }
}

export default Main;
