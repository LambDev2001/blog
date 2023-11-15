import React from "react";

const News = ({ news }) => {
  return (
    <div className="lg:w-1/3 md:w-1/2 sm:w-1 p-2">
      <div className="bg-white flex flex-col rounded-xl shadow-md overflow-hidden">
        <img className="w-full h-40 object-cover" src={news.urlToImage} alt="News Logo" />
        <div className="p-2">
          <h2 className="text-ellipsis overflow-hidden text-xl font-bold mb-2 text-black h-[80px] ">
            {news.title}
          </h2>
          <p className="text-ellipsis overflow-hidden text-gray-700 text-justify text-md h-[200px]">
            {news.description}
          </p>
          <div className="mt-4">
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline">
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
