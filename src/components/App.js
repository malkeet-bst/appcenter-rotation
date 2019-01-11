import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MemoryRouter } from 'react-router';
import Main from "./Main";
import NewRotation from "./NewRotation";
import EditRotation from "./EditRotation";

class App extends React.Component {

  render() {
    return (
      <div className="roation-container">
      {/* basename={`${window.location.href}`} */}
        <MemoryRouter  >
          <Switch>
            <Route path="/manage/rotation_cms" component={Main} exact />
            <Redirect from="*" to="/manage/rotation_cms" />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}
export default App;

//export default App;
