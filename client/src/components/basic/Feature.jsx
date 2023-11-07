import React from "react";
import { useSelector } from "react-redux";
import Friend from "../future/Friend";
import Group from "../future/Group";
import Translate from "../future/Translate";

const Feature = () => {
  const currentFeature = useSelector((state) => state.featureReducer);
  const token = useSelector((state) => state.authReducer.accessToken);

  return (
    <div>
      {currentFeature === "social" && token && (
        <div>
          <Friend /> <Group />
        </div>
      )}

      {currentFeature === "translate" && <Translate />}
    </div>
  );
};

export default Feature;
