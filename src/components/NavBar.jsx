import React from "react";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import If from "./common/If";
import { withRouter } from "react-router";
import GlobalActions from '../actions/GlobalActions'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: ""
    };
  }
  homePage = () => {
    GlobalActions.setCurrentView('home')
  };
  render() {
    return (
      <div className="nav">
        <Link to="/manage">Dashboard </Link>/&nbsp;
        <Link to="/manage/rotation_cms/show" onClick={this.homePage}> Bluestacks Rotation</Link>
        <If condition={this.props.page != undefined}>
          <span className="nav-new-rotation">/ {this.props.page} Rotation</span>
        </If>
      </div>
    );
  }
}

export default withRouter(injectIntl(NavBar));
