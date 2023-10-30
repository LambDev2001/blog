import React from "react";

const Test = () => {
  function showLink(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:opacity-70">' + url + "</a>";
    });
  }

  var text = "Find me at http://www.example.com and also at http://stackoverflow.com";
  var html = showLink(text);

  return <div className="text-white" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Test;