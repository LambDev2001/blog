import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import Alert from "./components/global/Alert";
import React from "react";
import { useSelector } from "react-redux";

import Menu from "../src/components/basic/Menu";
import Header from "../src/components/basic/Header";
import Friend from "../src/components/basic/Friend";
import Group from "../src/components/basic/Group";

function App() {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const height = window.innerHeight - 60;

  return (
    <div className="flex flex-col text-white">
      <Router>
        <Alert />
        <Header />

        {/* body */}
        <div className={`${themeColor.main} flex justify-between h-100`}>
          {/* menu */}
          <Menu />

          <Switch>
            <Route exact path="/" component={PageRender} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
          {/* <Footer /> */}

          {/* social */}
          <div
            className={`${themeColor.border} w-1/5 border-l custom-scroll-container`}
            style={{ height: `${height}px` }}>
            <div className="custom-scroll-content h-100 overflow-auto">
              <Friend />
              <Group />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
