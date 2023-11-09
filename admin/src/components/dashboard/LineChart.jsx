import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Interaction Rate",
    },
    datalabels: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "View",
      data: [20, 30, 21, 24, 23, 18, 25],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Comment",
      data: [2, 2, 5, 10, 7, 11, 5],

      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Share",
      data: [11, 15, 14, 13, 15, 12, 19],

      borderColor: "rgba(26, 192, 42, 1)",
      backgroundColor: "rgba(26, 192, 42, 0.5)",
    },
  ],
};

const LineChart = () => {
  const color = useSelector(state => state.themeReducer.themeColor)

  return (
    <div className={`${color.inside} rounded-lg shadow-md p-2 justify-center h-[400px]`}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
