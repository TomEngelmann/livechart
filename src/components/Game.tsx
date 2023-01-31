import Chart from "./Chart";
import PlayerCard from "./PlayerCard";
import { useGameModeStore, usePlayerStore } from "../states";
import React from "react";
export default function Game() {
  const { players, calculateScore } = usePlayerStore();
  const { setGameMode } = useGameModeStore();
  const [totalRounds, setTotalRounds] = React.useState(60 / players.length);
  const [round, setRound] = React.useState(1);
  const [predictMode, setPredictMode] = React.useState(true);

  function nextRound() {
    setRound(round + 1);
    setPredictMode(true);
    calculateScore();

    const currentRound = round;
    if (currentRound + 1 > totalRounds) {
      setGameMode("end");
      return;
    }
  }
  return (
    <>
      <div className="w-full grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-8">
          {<Chart />}
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:grid-cols-1 maxH">
            {players.map((item) => {
              return (
                <PlayerCard
                  name={item.name}
                  predictionMode={predictMode}
                  key={item.name}
                  round={round}
                  color={item.color}
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-2 text-right p-5">Runde {round} </div>
      </div>

      <div className="p-5 absolute bottom-0 w-full">
        <hr className="" />
        <div className="py-3 flex flex-row justify-between bg-white">
          <button
            className={` text-white font-bold py-2 px-4 rounded ${
              predictMode ? "bg-blue-500 hover:bg-blue-500" : "invisible"
            }
            ${
              players
                .map((item: any) => item.prediction)
                .reduce((prev: number, next: number) => prev + next) === round
                ? "bg-blue-200 hover:bg-blue-100"
                : ""
            }
            `}
            disabled={
              !predictMode ||
              players
                .map((item: any) => item.prediction)
                .reduce((prev: number, next: number) => prev + next) === round
            }
            onClick={() => {
              setPredictMode(false);
            }}
          >
            Start round
          </button>
          <div className={`${predictMode ? "" : "invisible"}`}>
            Predicted:
            {players
              .map((item: any) => item.prediction)
              .reduce((prev: number, next: number) => prev + next)}
          </div>
          <button
            className={`text-white font-bold py-2 px-4 rounded  ${
              predictMode ? "invisible" : "bg-blue-500 hover:bg-blue-500"
            }`}
            disabled={predictMode}
            onClick={() => {
              nextRound();
            }}
          >
            {round < totalRounds ? "Next round" : "Finish"}
          </button>
        </div>
      </div>
    </>
  );
}
