import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { useGameModeStore, usePlayerStore } from "../states";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const { players } = usePlayerStore();
  const totalRounds = 60 / players.length;
  const [fullScreen, setFullScreen] = React.useState(false);
  let labels = [];
  for (let i = 0; i <= totalRounds; i++) {
    labels.push(i);
  }
  const options: ChartOptions<"line"> = {
    maintainAspectRatio: true,

    responsive: true,
    plugins: {
      legend: {
        position: "left" as const,
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        position: "left",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: players.map((item) => {
      return {
        label: item.name,
        borderColor: item.color,
        lineTension: 0.1,
        data: item.history,
      };
    }),
  };
  return (
    <div
      className={fullScreen ? "full w-full" : ""}
      onClick={() => {
        setFullScreen((prev) => !prev);
      }}
    >
      <div className={fullScreen ? "content" : ""}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
