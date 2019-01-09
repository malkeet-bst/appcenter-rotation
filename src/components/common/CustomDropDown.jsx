import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class CustomDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }
  homePage = () => {
    this.props.history.push("/");
  };
  showCheckboxes = () => {
    console.log('hey',document.getElementById('selectBox'))
    var checkbox = document.getElementById('checkboxes');
    if (!this.state.expanded) {
      checkbox.style.display = "block";
      this.setState({ expanded: true })
    } else {
      checkbox.style.display = "none";
      this.setState({ expanded: false });
    }
  }
  render() {
    return (
      <div className="multiselect">
        <div id="selectBox" className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Select an option</option>
          </select>
          <div className="overSelect" />
        </div>
        <div id="checkboxes">
          <label for="one" ><input type="checkbox" id="one" />first</label>
          <label for="two" ><input type="checkbox" id="two" />seconf</label>
          <label for="three" ><input type="checkbox" id="three" />ret</label>
        </div>
      </div>
    );
  }
}

export default withRouter(injectIntl(CustomDropDown));
