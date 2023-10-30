const showLink = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:opacity-70">' +
      url +
      "</a>"
    );
  });
};

export default showLink;
