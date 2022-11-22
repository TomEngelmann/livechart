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
