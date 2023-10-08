import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import Alert from "./components/global/Alert";
import React from "react";

function App() {

  return (
    <div className="flex flex-col text-white">
      <Router>
        <Alert />

        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
