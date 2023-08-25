import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import Header from "../src/components/global/Header.jsx";
// import Footer from "../src/components/global/Footer.jsx";
import Alert from "./components/global/Alert";
import Menu from "./components/admin/Menu";

function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <div className="d-flex">
        <Menu />
        <div className="w-100">
          <Switch>
            <Route exact path="/" component={PageRender} />
            <Route exact path="/:role/:page" component={PageRender} />
            <Route exact path="/:role/:page/:slug" component={PageRender} />
          </Switch>
        </div>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
