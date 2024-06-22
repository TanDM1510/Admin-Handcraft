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
import { faker } from "@faker-js/faker"; // Ensure faker is correctly imported

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ffffff", // Màu chữ của legend
      },
    },
    title: {
      display: true,
      text: "Tổng doanh thu theo từng tháng",
      color: "#ffffff", // Màu chữ của title
      font: {
        size: 16,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Màu nền của tooltip
      titleColor: "#ffffff", // Màu chữ của tiêu đề tooltip
      bodyColor: "#ffffff", // Màu chữ của nội dung tooltip
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Màu của các đường lưới trục X
      },
      ticks: {
        color: "#ffffff", // Màu của các tick trục X
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Màu của các đường lưới trục Y
      },
      ticks: {
        color: "#ffffff", // Màu của các tick trục Y
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Sản phẩm bán ra",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: "rgb(75, 192, 192)", // Màu viền của dataset 1
      backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền của dataset 1
    },
    {
      label: "Doanh thu",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: "rgb(255, 159, 64)", // Màu viền của dataset 2
      backgroundColor: "rgba(255, 159, 64, 0.5)", // Màu nền của dataset 2
    },
  ],
};

export function ChartLine() {
  return (
    <div
      style={{ width: "100%", height: "400px" }}
      className="mt-16 border rounded-xl py-5 px-10 bg-black"
    >
      <Line options={options} data={data} />
    </div>
  );
}
