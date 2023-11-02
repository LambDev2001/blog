import { useState } from "react";

const Chat = ({ themeColor, data }) => {
  const height = window.innerHeight - 196;

  const [hoverItem, setHoverItem] = useState(null);

  const handleSetHover = (key) => {
    setHoverItem(key);
  };

  const handleMouseLeave = () => {
    setHoverItem(null);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "rar":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764038/blog/rar-icon_trdqon.jpg";
      case "js":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764067/blog/js-icon_w5hshg.png";
      case "tsx":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764067/blog/js-icon_w5hshg.png";
      case "ps":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764383/blog/Photoshop_CC_icon_hiubej.webp";
      case "css":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764617/blog/css-icon_pw3acs.png";
      case "html":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764688/blog/html-icon_pyi4rj.png";
      case "exe":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764738/blog/exe-icon_uvj470.png";
      default:
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764738/blog/exe-icon_uvj470.png";
    }
  };

  const getFileType = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    return extension;
  };

  const isImage = (fileType) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    return imageExtensions.includes(fileType);
  };

  const renderFile = (file) => {
    const fileType = getFileType(file);

    if (isImage(fileType)) {
      return (
        <div key={file} className="relative h-auto w-auto max-h-[100px] max-w-[100px] mx-1">
          <a href={file} rel="noreferrer" target="_blank">
            <img key={file} src={file} alt="" />

            <div
              className={`bg-[rgba(59,58,60,0.5)] backdrop-opacity-10 backdrop-invert absolute top-0 right-2 cursor-pointer p-1 text-xs rounded-full`}>
              Image
            </div>
          </a>
        </div>
      );
    } else {
      console.log(file);
      
      return (
        <div key={file} onMouseEnter={() => handleSetHover(file)} onMouseLeave={handleMouseLeave}>
          <a href={file} rel="noreferrer" target="_blank" className="relative">
            <img
              src={getFileIcon(fileType)}
              alt=""
              className={`${
                hoverItem === file && "opacity-0"
              } h-auto w-auto max-h-[100px] max-w-[100px] mx-1`}
            />
            <div
              className={` ${
                hoverItem === file && "opacity-0"
              }  bg-[rgba(59,58,60,0.5)] backdrop-opacity-10 backdrop-invert absolute top-0 right-2 cursor-pointer p-1 text-xs rounded-full`}>
              {fileType}
            </div>
            {hoverItem === file && (
              <div
                className={`absolute top-1/2 translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 z-50`}>
                <img
                  src="https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698829191/blog/download-icon_k3dg42.png"
                  alt=""
                  className="max-w-[60px] max-h-[60px] w-auto h-auto m-auto"
                />
              </div>
            )}
          </a>
        </div>
      );
    }
  };

  return (
    <div
      className={
        themeColor.sub +
        " " +
        themeColor.border +
        " my-1 py-auto rounded-lg border-1 custom-scroll-container"
      }
      style={{ height: `${height}px` }}>
      <div className="custom-scroll-content h-100 overflow-auto flex flex-col-reverse">
        {data &&
          data.map((item, index) => (
            <div key={index} className="m-2">
              {item.type === "text" && (
                <div className={`flex ${item.owner === true ? "flex-row-reverse" : "flex-row"} `}>
                  <img
                    src={item.author.avatar}
                    alt="avatar room"
                    className="h-[40px] w-[40px] mt-auto mb-4 mx-2 rounded-full"
                  />
                  <div
                    className={`${item.owner === true ? "text-right" : "text-left"} my-auto mx-2`}>
                    <div className="text-md text-gray-500 mx-2">{item.author.username}</div>
                    <div
                      className={themeColor.input + " rounded-full py-2 px-3 inline-block"}
                      dangerouslySetInnerHTML={{ __html: item.message }}></div>
                    <div className="text-sm text-gray-500 mx-2 my-1">{item.createdAt}</div>
                  </div>
                </div>
              )}

              {item.type === "image" && (
                <div className={`flex ${item.owner === true ? "flex-row-reverse" : "flex-row"} `}>
                  <img
                    src={item.author.avatar}
                    alt="avatar room"
                    className="h-[40px] w-[40px] mt-3 mb-2 mx-2 rounded-full"
                  />
                  <div
                    className={`${item.owner === true ? "text-right" : "text-left"} my-auto mx-2`}>
                    <div className="text-md text-gray-500 mx-2">{item.author.username}</div>
                    <div className="inline-block">
                      <div className={`flex flex-warp`}>
                        {item.message.map((file) => renderFile(file))}
                      </div>
                    </div>
                    <div className="flex justify-end text-sm text-gray-500 mx-2">
                      {item.createdAt}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chat;
