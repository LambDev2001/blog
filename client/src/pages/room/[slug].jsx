// import React, { useState, useRef, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { LuMoreHorizontal } from "react-icons/lu";
// import { BsImage, BsSend } from "react-icons/bs";
// import { IoMdClose } from "react-icons/io";

// const ChatPage = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [fileImage, setFileImage] = useState([]);
//   const themeColor = useSelector((state) => state.themeUserReducer);
//   // const { slug } = useParams();

//   const [inputText, setInputText] = useState("");

//   const height = window.innerHeight - 196;

//   const data = [
//     {
//       _id: "64yer",
//       name: "Lun",
//       avatar:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       owner: true,
//       type: "image",
//       message:
//         "data:image/png;base64,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",
//       createdAt: "2023-03-14T15:19:20.000Z",
//     },
//     {
//       _id: "64r2xd",
//       name: "uen",
//       avatar:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       owner: false,
//       type: "text",
//       message: "dont touch",
//       createdAt: "2023-03-14T15:19:20.000Z",
//     },
//     {
//       _id: "64r2md",
//       name: "tienb",
//       avatar:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       owner: false,
//       type: "text",
//       message: "no input",
//       createdAt: "2023-03-14T15:19:20.000Z",
//     },
//     {
//       _id: "64yer",
//       name: "Lu",
//       avatar:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       owner: true,
//       type: "image",
//       message:
//         "data:image/png;base64,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",
//       createdAt: "2023-03-14T15:19:20.000Z",
//     },
//   ];

//   const scrollRef = useRef();

//   useEffect(() => {
//     const scrollElement = scrollRef.current;
//     scrollElement.scrollTop = scrollElement.scrollHeight;
//   }, [data]);

//   const handleImageChange = (event) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
//       setSelectedImages([...selectedImages, ...imageUrls]);
//       setFileImage([...fileImage, ...files]);
//     }
//   };

//   // const handleImageChange = (event) => {
//   //   const files = event.target.files;
//   //   const promises = [];

//   //   if (files && files.length > 0) {
//   //     for (let i = 0; i < files.length; i++) {
//   //       const file = files[i];
//   //       const reader = new FileReader();

//   //       promises.push(
//   //         new Promise((resolve) => {
//   //           reader.onload = () => {
//   //             resolve(reader.result);
//   //           };
//   //           reader.readAsDataURL(file);
//   //         })
//   //       );
//   //     }

//   //     Promise.all(promises)
//   //       .then((imageBase64Data) => {
//   //         setFileImage([...fileImage, ...imageBase64Data]);
//   //       })
//   //       .catch((error) => {
//   //         // Xử lý lỗi khi đọc tệp
//   //       });
//   //   }
//   // };

//   const handleRemoveImage = (index) => {
//     const updatedImages = [...selectedImages];
//     updatedImages.splice(index, 1);
//     setSelectedImages(updatedImages);

//     const updateFiles = [...fileImage];
//     updateFiles.splice(index, 1);
//     setFileImage(updateFiles);
//   };

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSendClick = () => {
//     console.log("Text:", inputText);
//     console.log("Images:", fileImage);
//     setFileImage([]);
//     setSelectedImages([]);
//     setInputText("");
//   };

//   return (
//     <div>
//       {/* header */}
//       <div
//         className={
//           themeColor.sub +
//           " " +
//           themeColor.border +
//           " flex justify-between my-1 rounded-lg border-b h-[60px]"
//         }>
//         {/* Start */}
//         <div className=" flex my-auto mx-2">
//           <img
//             src="https://imgs.search.brave.com/TJxaWdHqQ9mr_vhn5YBPHQ3FadqPPogYjwu0u0DQlWI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/NzY3MTgzL3Bob3Rv/L2JhY2stZG9vci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZndqckE4RzBRVDlr/Qk55bjJBa1F6Si1T/R2NKNTdFODkwcWgx/dW11cnJuRT0"
//             alt="avatar room"
//             className="h-[40px] w-[40px] rounded-full"
//           />
//           <div className="my-auto mx-2">Name Room</div>
//         </div>

//         <div className={themeColor.input + " my-auto mx-2 p-1 rounded-full"}>
//           <LuMoreHorizontal size={24} />
//         </div>
//       </div>

//       {/* Chat */}
//       <div
//         className={
//           themeColor.sub +
//           " " +
//           themeColor.border +
//           " my-1 py-auto rounded-lg border-1 custom-scroll-container"
//         }
//         style={{ height: `${height}px` }}
//         ref={scrollRef}>
//         <div className="custom-scroll-content h-100 overflow-auto flex flex-col-reverse">
//           {data &&
//             data.map((item, index) => (
//               <div key={index} className="m-2">
//                 {item.type === "text" && (
//                   <div className={`${item.owner ? "flex-row-reverse" : ""} flex`}>
//                     <img
//                       src={item.avatar}
//                       alt="avatar room"
//                       className="h-[40px] w-[40px] mt-auto mb-4 mx-2 rounded-full"
//                     />
//                     <div className="my-auto mx-2">
//                       <div className="text-md text-gray-500 mx-2">{item.name}</div>
//                       <div className={themeColor.input + " rounded-full py-2 px-3"}>
//                         {item.message}
//                       </div>
//                       <div className="text-sm text-gray-500 mx-2">{item.createdAt}</div>
//                     </div>
//                   </div>
//                 )}

//                 {item.type === "image" && (
//                   <div className={`${item.owner ? "flex-row-reverse" : ""} flex`}>
//                     <img
//                       src={item.avatar}
//                       alt="avatar room"
//                       className="h-[40px] w-[40px] mt-auto mb-2 mx-2 rounded-full"
//                     />
//                     <div className="my-auto mx-2">
//                       <div className="text-md text-gray-500 mx-2">{item.name}</div>
//                       <img
//                         src={item.message}
//                         alt=""
//                         className="h-auto w-auto max-h-[200px] max-w-[200x]"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* input */}
//       <div
//         className={
//           themeColor.sub +
//           " " +
//           themeColor.border +
//           " relative flex mt-1 p-[12px] h-[60px] rounded-lg border-b"
//         }>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="hidden"
//           id="imageUpload"
//           multiple
//         />
//         <label htmlFor="imageUpload" className="my-auto mx-2 cursor-pointer rounded-md">
//           <BsImage size={24} />
//         </label>
//         <input
//           type="text"
//           value={inputText}
//           onChange={handleInputChange}
//           className={themeColor.input + " w-full rounded-full mx-2 focus:outline-none"}
//         />
//         <button onClick={handleSendClick} className="bg-blue-400 rounded-full py-2 px-3">
//           <BsSend size={24} />
//         </button>

//         {/* Show image */}
//         {selectedImages.length > 0 && (
//           <div className={themeColor.input + " absolute p-1 flex top-[-120px] right-0"}>
//             {selectedImages.map((imageUrl, index) => (
//               <div key={index} className="m-1 relative">
//                 <img
//                   src={imageUrl}
//                   alt=""
//                   className="my-auto"
//                   style={{
//                     maxWidth: "150px",
//                     maxHeight: "100px",
//                     width: "auto",
//                     height: "auto",
//                   }}
//                 />
//                 <div
//                   className={`${themeColor.input} ${themeColor.hoverBold} absolute p-1 top-0 right-0`}>
//                   <IoMdClose size={10} onClick={() => handleRemoveImage(index)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
