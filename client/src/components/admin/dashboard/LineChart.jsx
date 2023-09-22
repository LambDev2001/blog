import React from "react";
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
      data: labels.map(() => Math.floor(Math.random() * 100 + 100)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Comment",
      data: labels.map(() => Math.floor(Math.random() * 100 +20)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Share",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      borderColor: "rgba(26, 192, 42, 1)",
      backgroundColor: "rgba(26, 192, 42, 0.5)",
    },
  ],
};

const LineChart = () => {
  return (
    <div className="rounded-lg shadow-md p-2 justify-center bg-white h-[400px]">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
