import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Main from "./Main";
import NewRotation from "./NewRotation";
import EditRotation from "./EditRotation";

class App extends React.Component {

  render() {
    return (
      <div className="roation-container">
      {/* basename={`${window.location.href}`} */}
        <BrowserRouter  >
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/new" render={(props) => <NewRotation {...props} />} />
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
