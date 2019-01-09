import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import If from "./common/If";
import { withRouter } from "react-router";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: ""
    };
  }
  homePage = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="nav">
        <Link to="/">Dashboard </Link>/&nbsp;
        <Link to="/"> Bluestacks Rotation</Link>
        <If condition={this.props.page != undefined}>
          <span className="nav-new-rotation">/ {this.props.page} Rotation</span>
        </If>
      </div>
    );
  }
}

export default withRouter(injectIntl(NavBar));
