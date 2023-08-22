import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import Header from "../src/components/global/Header.jsx";
import Footer from "../src/components/global/Footer.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        
        <Route exact path="/" component={PageRender} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:slug" component={PageRender} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;