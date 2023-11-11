import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getAPI } from "../../utils/FetchData";

Chart.register(ArcElement, ChartDataLabels);

const PieChart = () => {
  const [data, setData] = useState([]);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const token = useSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    const getData = async () => {
      const res = await getAPI("count-category", token);
      if (!!res.data) {
        setData(res.data);
      }
    };

    getData();
  }, [token]);

  const top5 = data.slice(0, 5);
  const otherCountBlogs = data.slice(5).reduce((sum, item) => sum + item.countBlogs, 0);
  const pieData = [...top5, { category: "other", countBlogs: otherCountBlogs }];

  const chartData = {
    labels: pieData.map((item) => item.category),
    datasets: [
      {
        data: pieData.map((item) => item.countBlogs),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(128,128,128,0.6)", // gray color for 'other' category
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex] + "\n" + value + "%";
        },
        color: "#fff",
        font: {
          size: "16em",
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    tooltips: {
      enabled: true,
      mode: "single",
      callbacks: {
        label: function (tooltipItems, data) {
          const category = data.labels[tooltipItems.index];
          const value = data.datasets[0].data[tooltipItems.index];
          return category + ": " + value + "%";
        },
      },
    },
  };

  return (
    <div className={`${color.inside} rounded-lg shadow-md p-2 h-[400px]`}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
