import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircleUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { GrShare } from "react-icons/gr";

const Search = ({ data, type }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const color = useSelector((state) => state.themeReducer.themeColor);

  const colorStatus = [
    "rgba(240, 240, 240, 0.8)",
    "rgba(85, 230, 86, 0.8)",
    "rgba(255, 235, 59, 0.8)",
    "rgba(255, 99, 71, 0.8)",
  ];

  const handleSearch = () => {
    const filteredData = data.filter((object) =>
      Object.values(object).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setSearchResults(filteredData);
  };

  return (
    <div>
      <div
        className={`${color.outside} flex align-items-center justify-between rounded-md shadow-md my-2 h-[58px] relative`}>
        <input
          type="text"
          placeholder="Type to search..."
          className="mx-2 p-2 w-100 h-10 rounded outline-none shadow-md focus:border-b-2 focus:border-blue-500 hover:outline-solid hover:outline-lightgray"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (e.target.value.trim() === "" || e.target.value.length < 3) {
              setSearchResults([]);
            } else {
              handleSearch();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSearchText("");
              setSearchResults([]);
            }
          }}
        />

        <FontAwesomeIcon
          icon={faXmark}
          className="ml-[-3rem] mr-3 p-2"
          onClick={() => {
            setSearchText("");
            setSearchResults([]);
          }}
        />

        <button className={`${color.active} text-white rounded p-2 mx-3`} onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="h-[40px w-[40px]" />
        </button>
      </div>

      {/* Display search results */}
      <div
        className="absolute shadow-element radius-element"
        style={{
          zIndex: "500",
          backgroundColor: "white",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
        {type === "user" &&
          searchResults.map((result, index) => (
            <div className="flex items-center border-element radius-element p-2 m-1" key={index}>
              <div className="flex items-center flex-grow">
                {" "}
                {/* Use flex-grow to make email part take up all available space */}
                <img
                  src={result.avatar}
                  className="avatar w-12 h-12 mx-3 my-1 rounded-full"
                  alt=""
                />
                <div className="mx-3">
                  <div className="font-semibold">{result.username}</div>
                  <div className="text-gray-600">{result.account}</div>
                </div>
              </div>
              <div
                className="text-gray-600 mx-3 rounded text-center border-element w-[50px] p-1"
                style={{
                  backgroundColor: `${colorStatus[result.status]}`,
                  border: "1px solid #6b666644",
                }}>
                {result.status}
              </div>
              <FontAwesomeIcon
                icon={faCircleUser}
                className="h-[30px] mx-3 cursor-pointer"
                style={{ marginLeft: "auto" }}
                onClick={() => history.push(`/profile/${result._id}`)}
              />
            </div>
          ))}

        {type === "blog" &&
          searchResults.map((result, index) => (
            <div className="flex items-center border-element radius-element p-2 m-1" key={index}>
              <div className="flex items-center flex-grow">
                {/* Use flex-grow to make email part take up all available space */}
                <div className="flex-6 mx-3">
                  <div className="flex justify-between">
                    <div className="font-semibold">{result.title}</div>
                    <div
                      className="text-gray-600 mx-3 rounded text-center border-element w-[80px] p-1"
                      style={{
                        backgroundColor: `${
                          result.status === "normal" ? colorStatus[1] : colorStatus[2]
                        }`,
                        border: "1px solid #6b666644",
                      }}>
                      {result.status}
                    </div>
                  </div>
                  <div className="text-gray-600">{result.description}</div>
                </div>
                <img
                  src={result.thumbnail}
                  className="flex-2 max-h-[100px] mx-w-[200px] mx-3 my-1"
                  alt=""
                />
                <div className="flex-1 mx-3">
                  <GrShare
                    className="cursor-pointer m-auto"
                    size={28}
                    onClick={() => history.push(`/blog/${result._id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
