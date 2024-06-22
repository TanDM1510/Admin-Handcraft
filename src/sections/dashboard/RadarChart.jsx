import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
        size: 16, // Kích thước chữ của title
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Màu nền của tooltip
      titleColor: "#ffffff", // Màu chữ của tiêu đề tooltip
      bodyColor: "#ffffff", // Màu chữ của nội dung tooltip
    },
  },
  scales: {
    r: {
      angleLines: {
        color: "rgba(255, 255, 255, 0.2)", // Màu của các đường góc
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Màu của các đường lưới
      },
      pointLabels: {
        color: "#ffffff", // Màu của các nhãn điểm
      },
      ticks: {
        backdropColor: "rgba(0, 0, 0, 0.5)", // Màu nền của các tick
        color: "#ffffff", // Màu của các tick
      },
    },
  },
};

export const data = {
  labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "Các sản phẩm bán chạy nhất",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền của dataset
      borderColor: "rgb(75, 192, 192)", // Màu viền của dataset
      borderWidth: 2,
    },
  ],
};

export function RadarChart() {
  return (
    <div className="border px-5 py-5 rounded-xl bg-black">
      <Radar height={400} width={400} data={data} options={options} />
    </div>
  );
}
