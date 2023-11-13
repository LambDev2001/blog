import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { GrShare, GrAdd, GrSearch } from "react-icons/gr";
import { FaXmark, FaCircleUser } from "react-icons/fa6";

const Search = ({ data, type, add = false, handleAdd = () => {} }) => {
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

        <FaXmark
          className="ml-[-2.5rem] mr-3"
          size={20}
          onClick={() => {
            setSearchText("");
            setSearchResults([]);
          }}
        />

        <button className={`${color.active} text-white rounded p-2 mx-3`} onClick={handleSearch}>
          <GrSearch size={20} />
        </button>

        {add && (
          <button className={`${color.active} text-white rounded p-2 mr-3`} onClick={handleAdd}>
            <GrAdd size={20} />
          </button>
        )}
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
              <FaCircleUser
                size={30}
                className="mx-3 cursor-pointer"
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
                <div className="w-[70%] mx-3">
                  <div className="flex justify-between">
                    <div className="font-semibold">{result.title}</div>
                    <div>
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
                  </div>
                  <div className="text-gray-600">{result.description}</div>
                </div>
                <img
                  src={result.thumbnail}
                  className="w-[30%] max-h-[100px] mx-3 my-1"
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
