import React, {useEffect} from "react";
import { getAPI } from "../utils/FetchData";

const App = () => {
  useEffect(() => {
    async function fetchData() {
      const response = await getAPI("users");
      console.log(response);
    }
    fetchData();
  }, []);

  return <div>Loading</div>;
};

export default App;
