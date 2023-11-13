import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {
  const color = useSelector((state) => state.themeReducer.themeColor);
  const history = useHistory();

  return (
    <div
      className={` ${color.inside} flex flex-col items-center justify-center h-screen p-5 text-center`}>
      <h1 className="text-6xl font-bold mb-5">Welcome to the Admin Panel!</h1>
      <p className="text-2xl mb-5">
        This is your space to manage and create amazing content for your blog.
      </p>
      <p className="text-xl mb-5">
        As a moderator, you can create posts, manage comments, and interact with the community.
        We're excited to see what you'll contribute!
      </p>
      <button
        className="bg-blue-400 px-10 py-2 rounded font-bold text-xl hover:bg-blue-200 transition-colors"
        onClick={() => history.push("/blogs")}>
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
