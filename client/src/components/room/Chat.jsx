import React from "react";

const Chat = ({ themeColor, data }) => {
  const height = window.innerHeight - 196;

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
                <div className={`${item.owner ? "flex-row-reverse" : ""} flex`}>
                  <img
                    src={item.author.avatar}
                    alt="avatar room"
                    className="h-[40px] w-[40px] mt-auto mb-4 mx-2 rounded-full"
                  />
                  <div className="my-auto mx-2">
                    <div className="text-md text-gray-500 mx-2">{item.author.username}</div>
                    <div className={themeColor.input + " rounded-full py-2 px-3"}>
                      {item.message}
                    </div>
                    <div className="text-sm text-gray-500 mx-2">{item.createdAt}</div>
                  </div>
                </div>
              )}

              {item.type === "image" && (
                <div className={`${item.owner ? "flex-row-reverse" : ""} flex`}>
                  <img
                    src={item.author.avatar}
                    alt="avatar room"
                    className="h-[40px] w-[40px] mt-auto mb-2 mx-2 rounded-full"
                  />
                  <div className="my-auto mx-2">
                    <div className="flex justify-end text-md text-gray-500 mx-2">{item.author.username}</div>
                    <div className="flex flex-warp">
                      {item.message.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="h-auto w-auto max-h-[100px] max-w-[100x] mx-1"
                        />
                      ))}
                    </div>
                    <div className="flex justify-end text-sm text-gray-500 mx-2">{item.createdAt}</div>
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
