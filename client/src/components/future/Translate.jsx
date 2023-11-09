import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { BsFillVolumeUpFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Translate = () => {
  const [textFrom, setTextFrom] = useState("en-US");
  const [textTo, setTextTo] = useState("vi-VN");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isTranslate, setIsTranslate] = useState(false);
  const [isCopy, setIsCopy] = useState(null);

  const themeColor = useSelector((state) => state.themeUserReducer);
  const height = window.innerHeight - 60;

  const languageList = [
    { code: "am-ET", name: "Amharic" },
    { code: "ar-AE", name: "Arabic" },
    { code: "bn-BD", name: "Bangla" },
    { code: "de-DE", name: "German" },
    { code: "en-US", name: "English" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "hi-IN", name: "Hindi" },
    { code: "id-ID", name: "Indonesian" },
    { code: "it-IT", name: "Italian" },
    { code: "ja-JP", name: "Japanese" },
    { code: "ko-KR", name: "Korean" },
    { code: "ms-MY", name: "Malay" },
    { code: "pt-BR", name: "Portuguese" },
    { code: "ru-RU", name: "Russian" },
    { code: "th-TH", name: "Thai" },
    { code: "tr-TR", name: "Turkish" },
    { code: "uk-UA", name: "Ukrainian" },
    { code: "vi-VN", name: "Vietnamese" },
  ];

  const indexLanguage = (value) => {
    const index = languageList.findIndex((item) => item.code === value);
    return index;
  };

  const handleChangeInput = (value) => {
    setText(value);
    if (value === "") setResult("");
  };

  const handleSpeak = (value, code) => {
    let speak;
    speak = new SpeechSynthesisUtterance(value);
    speak.lang = code;
    speechSynthesis.speak(speak);
  };

  const handleCopy = (value) => {
    if (value) {
      navigator.clipboard.writeText(value);
      setIsCopy(value);
    }
  };

  useEffect(() => {
    let timeout;
    if (isCopy) {
      timeout = setTimeout(() => {
        setIsCopy(null);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopy]);

  const handleClear = () => {
    setText("");
    setResult("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTranslate(true);

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${textFrom}|${textTo}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.responseData.translatedText);
        setIsTranslate(false);
      });
  };

  return (
    <div className={`${themeColor.main} p-2 w-100`} style={{ height }}>
      <div className={`${themeColor.sub} flex flex-col justify-between rounded-md p-2 h-100`}>
        <div className="h-100">
          {/* Input to trans */}
          <div
            className={`${themeColor.border} border-1 h-[40%] w-100 shadow-md flex flex-col justify-between rounded-md overflow-hidden relative`}>
            <textarea
              className={`${themeColor.input} h-100 w-100 border-none outline-none text-md rounded-sm bg-none p-2`}
              placeholder="Enter text"
              name="text"
              value={text}
              onChange={(e) => handleChangeInput(e.target.value)}></textarea>
            <div className="flex justify-between p-2">
              <div className="flex my-auto">
                <BsFillVolumeUpFill
                  className="mx-2 cursor-pointer"
                  size={20}
                  onClick={() => handleSpeak(text, textFrom)}
                />
                <div className="relative">
                  <FaCopy
                    className="mx-2 cursor-pointer"
                    size={20}
                    onClick={() => handleCopy(text)}
                  />
                  {isCopy === text && (
                    <div className="absolute top-[-30px] right-[-30px] p-2 mt-1 rounded-md text-sm bg-white text-black">
                      Copied
                    </div>
                  )}
                </div>
              </div>
              <div>
                <select
                  name="textFrom"
                  id=""
                  className={`${themeColor.input} ${themeColor.border} p-1 border-1`}
                  onChange={(e) => setTextFrom(e.target.value)}>
                  {indexLanguage(textFrom) !== 0 && (
                    <option
                      key={indexLanguage(textFrom)}
                      value={languageList[indexLanguage(textFrom)].code}>
                      {languageList[indexLanguage(textFrom)].name}
                    </option>
                  )}
                  {languageList.map((value, index) => (
                    <option key={index} value={value.code}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <IoMdClose
              className="absolute top-2 right-2 cursor-pointer"
              size={20}
              onClick={handleClear}
            />
          </div>

          <hr className={`${themeColor.border} border-1 mx-2 my-2`} />

          {/* Translated */}
          <div
            className={`${themeColor.border} border-1 h-[40%] w-100 shadow-md flex flex-col justify-between rounded-md overflow-hidden`}>
            <textarea
              className={`${themeColor.input} h-100 w-100 border-none outline-none text-md rounded-sm bg-none p-2`}
              placeholder={isTranslate ? "Translating..." : "Translated"}
              value={result}
              disabled></textarea>
            <div className="flex justify-between p-2">
              <div className="flex my-auto">
                <BsFillVolumeUpFill
                  className="mx-2 cursor-pointer"
                  size={20}
                  onClick={() => handleSpeak(result, textTo)}
                />
                <div className="relative">
                  <FaCopy
                    className="mx-2 cursor-pointer"
                    size={20}
                    onClick={() => handleCopy(result)}
                  />
                  {isCopy === result && (
                    <div className="absolute top-[-30px] right-[-30px] p-2 mt-1 rounded-md text-sm bg-white text-black">
                      Copied
                    </div>
                  )}
                </div>
              </div>
              <div>
                <select
                  name="textTo"
                  id=""
                  className={`${themeColor.input} ${themeColor.border} p-1 border-1`}
                  onChange={(e) => setTextTo(e.target.value)}>
                  {indexLanguage(textTo) !== 0 && (
                    <option
                      key={indexLanguage(textTo)}
                      value={languageList[indexLanguage(textTo)].code}>
                      {languageList[indexLanguage(textTo)].name}
                    </option>
                  )}
                  {languageList.map((value, index) => (
                    <option key={index} value={value.code}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full px-4 py-3 border-none outline-none cursor-pointer text-white text-lg rounded-md bg-blue-400"
          onClick={(e) => handleSubmit(e)}>
          Translate Text
        </button>
      </div>
    </div>
  );
};

export default Translate;
