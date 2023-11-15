import React, { useState, useEffect } from "react";

const Test = () => {
  const [date, setDate] = useState(new Date());
  const [battery, setBattery] = useState({ level: 0, charging: false });

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    navigator.getBattery().then((bat) => {
      setBattery({ level: bat.level, charging: bat.charging });
    });
  }, []);

  return (
    <div>
      <p>Ngày giờ hiện tại: {date.toLocaleString()}</p>
      <p>Thời gian: {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</p>
      <p>
        Dung lượng pin: {(battery.level * 100).toFixed(0)}% -{" "}
        {battery.charging ? "Đang sạc" : "Không sạc"}
      </p>
    </div>
  );
};

export default Test;
