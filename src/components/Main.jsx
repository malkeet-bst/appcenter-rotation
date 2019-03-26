import React from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import Utils from '../utils/util'
import BsIcon from "../images/bluestack_icon.png";
import RotationStore from "../store/RotationStore";
import GlobalActions from "../actions/GlobalActions";
import If from "./common/If";
import EditRotation from "./EditRotation";
import NewRotation from "./NewRotation";

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getUpdatedState();
    this.editData = this.editData.bind(this)
  }

  componentWillMount = () => {
    let { selectedPartner } = this.state.RotationS
    if (selectedPartner != null) {
      GlobalActions.fetchRotationData.defer(selectedPartner);
    } else
      GlobalActions.fetchRotationData.defer();
  };

  getUpdatedState = () => {

    return {
      showRows: 50,
      rotationRowData: [],
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
  
  updateOrder = () => {
    let reorderedArr=[]
    for(var i=0;i<5;i++){
     reorderedArr.push( document.getElementsByClassName("rotation-row")[i].innerText )
    }
    console.log(reorderedArr)
  };
  setPartner = () => {
    let partner = document.getElementById("selectedPartner").value;
    document.getElementById("searchText").value='';
    
    document.getElementById("filterData").value = "50";
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
  searchFilter = () => {
    let input, filter, table, tr, i;
    input = document.getElementById("searchText");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      let tdString = ''
      for (var j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
        tdString += tr[i].getElementsByTagName("td")[j].textContent
      }
      if (tdString) {
        if (tdString.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  editData = (data) => {
    GlobalActions.setCurrentView('edit')
    this.setState({
      rotationRowData: data
    });

  };

  addData = () => {
    GlobalActions.setCurrentView('new')
  }
  render() {
    let { rotationData, apiStatus, partnerList, selectedPartner, currentView } = this.state.RotationS;
    let dashboardUrl = Utils.getUrlFromInstance(Utils.getCloudInstance())
    console.log({rotationData})
    if (this.state.showRows && rotationData) {
      let number = this.state.showRows;
      rotationData = rotationData.slice(0, number);
    }
    console.log({rotationData})
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
        <tr key={index} >
          <td className="rotation-row">{data.id}</td>
          <td>{data.package_name}</td>
          <td>{data.game_name}</td>
          <td>{data.action}</td>
          <td>
            <a href={data.image_url} target="view_window"><img
              style={{ height: "80px" }}
              src={data.image_url}
              alt={data.image_url}
            /></a>
          </td>
          <td>{data.order}</td>
          <td>{data.uptime}</td>
          <td><a href={data.download_url} >{data.download_url}</a></td>
          <td>{data.sticky_app ? "true" : "false"}</td>
          {/* <td>{data.parameter}</td>
          <td>{data.title}</td> */}
          <td>
            <div className="row-actions">
              <button className="btn btn-link" onClick={() => this.editData(data)} >Edit</button>
              <button className="btn btn-link" onClick={() => this.deleteClicked(data.id)} >Delete</button>
            </div>
          </td>
        </tr>
      ));
    }
    return (
      <div className="main">
        <If condition={apiStatus === 'loading'}>
          <div className="page-loader" />
        </If>
        <If condition={apiStatus === 'error'}>
          <div className="alert alert-danger">
            <strong>Some Error occured!</strong>
          </div>
        </If>
        <If condition={currentView === 'edit'} >
          <EditRotation data={this.state.rotationRowData} />
        </If>
        <If condition={currentView === 'new'} >
          <NewRotation data={partnerList} />
        </If>

        <If condition={ currentView === 'home'}>
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
              to={{ pathname: "/manage/rotation_cms/show" }}
              onClick={() => this.addData()}
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
                defaultValue="50"
                onChange={this.filterData}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
              <input
                type="text"
                onKeyUp={this.searchFilter}
                className="form-control"
                placeholder="search"
                id="searchText"
              />
            </div>

            <div className="view">
              <label> View Rotation</label>
              <select className="custom-dropdown" onChange={this.setPartner} id="selectedPartner" value={`${selectedPartner}`}>
                {partnerOptions}
              </select>
              <button onClick={this.setPartner} class="btn btn-info"><span class="glyphicon glyphicon-refresh"></span> Refresh</button>
              {/*<button
                type="button"
                onClick={this.updateOrder}
                className="btn btn-info btn-md"
              >
                <span> Save Order</span>
              </button> */}
              <If condition={apiStatus === 'loading'}>
                <div className="page-loader"></div>
              </If>
            </div>
          </div>
          <table id="myTable" className="rotation-table table table-striped">
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
                {/* <th>parameter</th>
                <th>title</th> */}
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
