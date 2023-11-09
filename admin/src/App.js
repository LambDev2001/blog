import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import PageRender from "./PageRender";
import Alert from "./components/global/Alert";
import Menu from "./components/Menu";
import Loading from "./components/Loading";

function App() {
  const loading = useSelector((state) => state.loadingReducer.loading);

  return (
    <div className="d-flex">
      {loading && <Loading />}
      <Router>
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
