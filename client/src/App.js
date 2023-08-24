import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import Header from "../src/components/user/global/Header.jsx";
// import Footer from "../src/components/global/Footer.jsx";
import Alert from "./components/user/Alert";

function App() {
  return (
      <Router>
        <Header />
        <Alert />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:role/:page" component={PageRender} />
          <Route exact path="/:role/:page/:slug" component={PageRender} />
        </Switch>
        {/* <Footer /> */}
      </Router>
  );
}

export default App;
