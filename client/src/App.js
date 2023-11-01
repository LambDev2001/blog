import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import Alert from "./components/global/Alert";
import PageRender from "./PageRender";
import Menu from "../src/components/basic/Menu";
import Header from "../src/components/basic/Header";
import Friend from "../src/components/basic/Friend";
import Group from "../src/components/basic/Group";

import SocketContext from "./utils/SocketContext";
import Loading from "./components/basic/Loading";

function App() {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const height = window.innerHeight - 60;
  const token = useSelector((state) => state.authReducer.accessToken);
  const loading = useSelector((state) => state.loadingReducer.loading);
  const user = useSelector((state) => state.authReducer.user);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(io());
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket, user]);

  return (
    <SocketContext.Provider value={socket}>
      <div className="flex flex-col text-white">
        {loading && <Loading />}
        <Router>
          <Alert />
          <Header />

          {/* body */}
          <div className={`${themeColor.main} flex justify-between h-100`}>
            {/* menu */}
            <div
              className={`w-1/5 custom-scroll-container ${themeColor.border} border-r`}
              style={{ height: `${height}px` }}>
              <div className="custom-scroll-content h-100 overflow-auto px-2">
                {token && <Menu />}
              </div>
            </div>

            <div className={`w-3/5 custom-scroll-container`} style={{ height: `${height}px` }}>
              <div className="custom-scroll-content h-100 overflow-auto px-2">
                <Switch>
                  <Route exact path="/" component={PageRender} />
                  <Route exact path="/:page" component={PageRender} />
                  <Route exact path="/:page/:slug" component={PageRender} />
                </Switch>
              </div>
            </div>
            {/* <Footer /> */}

            {/* social */}
            <div
              className={`${themeColor.border} w-1/5 border-l custom-scroll-container`}
              style={{ height: `${height}px` }}>
              <div className="custom-scroll-content h-100 overflow-auto">
                {token && (
                  <div>
                    <Friend />
                    <Group />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
