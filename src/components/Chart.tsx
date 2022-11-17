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
export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
}
interface Players extends Array<Player> {}

interface ChartProps {
  totalRounds: number;
  playerSet: Players;
}

export default function Chart({ playerSet, totalRounds }: ChartProps) {
  let labels = [];
  for (let i = 0; i <= totalRounds; i++) {
    labels.push(i);
  }
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
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
    datasets: playerSet.map((item: Player) => {
      return {
        label: item.name,
        borderColor: item.color,
        lineTension: 0.1,
        data: item.history,
      };
    }),
  };
  return <Line options={options} data={data} className="w-full" />;
}
