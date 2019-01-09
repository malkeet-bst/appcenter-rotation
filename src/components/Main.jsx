import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

import BsIcon from "../images/bluestack_icon.png"
import RotationStore from "../store/RotationStore"
import GlobalActions from '../actions/GlobalActions'
class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getUpdatedState()
  }


  componentWillMount = () => {
    GlobalActions.fetchRotationData.defer()
  }

  getUpdatedState = () => {
    return {
      RotationS: RotationStore.getState()
    }
  }

  onChange = () => {
    this.setState(this.getUpdatedState())
  }

  componentDidMount = () => {
    RotationStore.listen(this.onChange)
  }

  componentWillUnmount = () => {
    RotationStore.unlisten(this.onChange)
  }
  newRotation = () => {
    console.log("new");
    this.props.history.push("/new");
  };
  editRow = () => {
    console.log("edit");
  };
  deleteRow = () => {
    console.log("delete");
  };
  render() {

    let rotationData = this.state.RotationS.rotationData
    let rowData = rotationData.map((data, index) => (
      <tr key={index}>
        <td>{data.package_name}</td>
        <td>{data.game_name}</td>
        {/* <td>{data.action}</td> */}
        <td>{data.package_name}</td>
        <td>{data.game_name}</td>
        {/* <td>{data.action}</td> */}
        <td>{data.package_name}</td>
        {/* <td>{data.action}</td> */}
        <td>
          <div className="row-actions">
            <Link to={{ pathname: '/edit', state: { data: rotationData[index] } }} >Edit</Link>
            <Link to="/">Delete</Link>
          </div>
        </td>
      </tr>
    ));
    console.log({ rowData });
    return (
      <div className="main">
        <div className="home-nav">
          <Link to="/">Dashboard </Link>
          <span className="nav-new-rotation">/ Bluestacks Rotation</span>
        </div>
        <div className="heading">
          <div className="icon-container">
            <img className="icon" src={BsIcon} alt="" />
            <h2> Bluestacks Rotation</h2>
          </div>
          <button
            type="button"
            onClick={this.newRotation}
            className="btn btn-primary btn-md glyphicon-plus"
          >
            <span> New Rotation</span>
          </button>
        </div>
        <div className="filter-data">
          <div className="form-group">
            <label>Show Enteries</label>
            <select className="custom-dropdown">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input type="text" className="form-control" id="text" />
          </div>

          <div className="view">
            View Rotation
            <select className="custom-dropdown">
              <option value="vn">vn</option>
              <option value="us">us</option>
            </select>
            <button
              type="button"
              onClick={this.viewRotaion}
              className="btn btn-default btn-md"
            >
              <span> View</span>
            </button>
          </div>
        </div>
        <table className="rotation-table table table-hover">
          <thead>
            <tr>
              <th>Order</th>
              <th>id</th>
              <th>package_name</th>
              <th>game_name</th>
              <th>action</th>
              <th>image_url</th>
              <th>download_url</th>
              <th>sticky app</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{rowData}</tbody>
        </table>
      </div>
    );
  }
}

export default Main;
