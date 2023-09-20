import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, ChartDataLabels);

const Charts = () => {
  const data = [
    { category: "java", blogCount: 10 },
    { category: "javascript", blogCount: 15 },
    { category: "information", blogCount: 20 },
    { category: "social", blogCount: 5 },
    { category: "travel", blogCount: 3 },
    { category: "mobile", blogCount: 2 },
    { category: "money", blogCount: 15 },
    { category: "car", blogCount: 30 },
    { category: "cars", blogCount: 0 },
  ];

  data.sort((a, b) => b.blogCount - a.blogCount);

  const top5 = data.slice(0, 5);
  const otherBlogCount = data.slice(5).reduce((sum, item) => sum + item.blogCount, 0);
  const pieData = [...top5, { category: "other", blogCount: otherBlogCount }];

  const chartData = {
    labels: pieData.map((item) => item.category),
    datasets: [
      {
        data: pieData.map((item) => item.blogCount),
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
          size: 16,
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
    <div className="m-3 rounded-lg shadow-md p-2">
      <div className="text-xl font-semibold">Top 5 categories</div>
      <div className="w-[400px] p-2">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Charts;
