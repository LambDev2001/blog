import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Weather = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("Can Tho");
  const [localTime, setLocalTime] = useState(new Date(`${data.location?.localtime}:00`));

  const themeColor = useSelector((state) => state.themeUserReducer);
  const height = window.innerHeight - 60;

  useEffect(() => {
    let apiKey = "c3df134eaf344f3797d34253231011"; // Thay đổi thành API key của bạn
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setData(res);
        setLocalTime(new Date(res.location.localtime));
      })
      .catch((error) => console.error("Error:", error));
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log(data);

  return (
    <div className={`${themeColor.main} p-2 w-100`} style={{ height }}>
      <div className={`${themeColor.sub} rounded-md p-2 h-100`}>
        {/* Search Bar */}
        <div className={`${themeColor.input} mb-3 p-1`}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`${themeColor.input} p-2 rounded-md w-100 focus:outline-none hover:bg-white`}
          />
        </div>

        {/* Content */}
        <div className={`${themeColor.main} p-1 rounded-md`}>
          <h1 className="text-2xl font-bold">{data.location?.name}</h1>
          <div className="flex justify-end">
            <p>{localTime.toLocaleString()}</p>
          </div>
          <img
            src={`https:${data.current?.condition.icon}`}
            alt="Weather icon"
            className="w-[50%] mx-auto"
          />
          <p className="text-lg mx-auto my-2">{data.current?.condition.text}</p>
          <div className="flex">
            <div className="w-1/2">
              <p className="text-lg">Temperature:</p>
              <p className="text-lg">Humidity:</p>
              <p className="text-lg">Wind speed:</p>
            </div>
            <div className="w-1/2">
              <p className="text-lg">{`${data.current?.temp_c}°C`}</p>
              <p className="text-lg">{`${data.current?.humidity}%`}</p>
              <p className="text-lg">{`${data.current?.wind_kph} km/h`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
