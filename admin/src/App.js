import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import Alert from "./components/global/Alert";
import Menu from "./components/Menu";
import AdminRouteWrapper from "./utils/AdminRouteWrapper";
import React from "react";

function App() {
  return (
    <div className="d-flex">
      <Router>
        <AdminRouteWrapper />
        <Menu />
        <div className="w-100">
          <div className="mx-2">
            <Alert />

            <Switch>
              <Route exact path="/" component={PageRender} />
              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:slug" component={PageRender} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
