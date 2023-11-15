import React, { useEffect, useState } from "react";

import News from "../components/future/News";
import { useSelector } from "react-redux";

const NewsPage = () => {
  const [data, setData] = useState([]);
  const [key, setKey] = useState("bitcoin");
  const [tempKey, setTempKey] = useState("bitcoin");
  const [showAll, setShowAll] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const themeColor = useSelector((state) => state.themeUserReducer);

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth();
  if (month === 0) {
    month += 1;
  }

  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    let apiUrl = `https://newsapi.org/v2/everything?q=${key}&from=${formattedDate}&sortBy=publishedAt&apiKey=537e4c2ec7d24368bd16783a3ddd73ae`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((news) => {
        if (news.status === "ok") {
          setData(news.articles);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      })
  }, [key, formattedDate, showAll, data]);

  useEffect(() => {
    setDisplayData(showAll ? data : data.slice(0, 21));
  }, [data, showAll]);

  const handleChangeSearch = (e) => {
    setTempKey(e.target.value);
  };

  const handleSearch = () => {
    setKey(tempKey);
  };

  return (
    <div>
      <div className={`${themeColor.text} my-3 w-100 flex`}>
        <input
          type="text"
          className={`${themeColor.border} ${themeColor.input} border-1 w-100 mx-2 py-2 px-3 rounded-md shadow-md appearance-none leading-tight focus:outline-none`}
          placeholder="Search News ..."
          name="search"
          onChange={(e) => handleChangeSearch(e)}
        />
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-3 rounded-md shadow-md flex justify-center cursor-pointer"
          onClick={handleSearch}>
          Search
        </div>
      </div>
      <div className="flex flex-wrap">
        {displayData.map((news, index) => (
          <News key={index} news={news} />
        ))}
      </div>
      {!showAll && (
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center my-2 mx-auto cursor-pointer"
          onClick={() => setShowAll(true)}>
          Show more
        </div>
      )}
    </div>
  );
};

export default NewsPage;
