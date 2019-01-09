import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Main from "./Main";
import NewRotation from "./NewRotation";
import EditRotation from "./EditRotation";
import RotationStore from "../store/RotationStore";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
   
  // }


  render() {
    return (
      <div className="roation-container">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/new" render={(props) => <NewRotation {...props} flag={true} />} />
            <Route path="/edit" component={EditRotation} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

//export default App;
