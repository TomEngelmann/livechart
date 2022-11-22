import React from "react";
import "./App.css";
import Chart from "./components/Chart";
import FinishScreen from "./components/FinishScreen";
import PlayerCard from "./components/PlayerCard";
import PreGame from "./components/PreGame";

export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
}
export interface Prediction {
  [key: string]: {
    prediction: number;
    errors: number;
  };
}
interface PlayerPrediction {
  name: string;
  prediction: number;
  errors: number;
}

interface Players extends Array<Player> {}
function App() {
  const [gameMode, setGameMode] = React.useState("end");
  const [predictMode, setPredictMode] = React.useState(true);
  const [round, setRound] = React.useState(1);
  const [players, setPlayers] = React.useState<Players>([
    {
      name: "Player1",
      points: 0,
      history: [0],
      color: "green",
    },
    {
      name: "Player2",
      points: 0,
      history: [0],
      color: "blue",
    },
    {
      name: "Player3",
      points: 0,
      history: [0],
      color: "red",
    },
    {
      name: "Player4",
      points: 0,
      history: [0],
      color: "red",
    },
    {
      name: "Player4",
      points: 0,
      history: [0],
      color: "red",
    },
    {
      name: "Player4",
      points: 0,
      history: [0],
      color: "red",
    },
  ]);

  const [predictions, setPredictions] = React.useState<Prediction>({}); //Prediction Object

  const [totalRounds, setTotalRounds] = React.useState(60 / players.length); //Total Rounds

  function nextRound() {
    setRound(round + 1);
    calculateScores();
    let currentRound = round;
    if (currentRound + 1 > totalRounds) {
      const sortedPlayers = players.sort((a, b) =>
        a.points > b.points ? -1 : 1
      );
      setPlayers(sortedPlayers);
      setGameMode("end");
      return;
    }
    setPredictMode(true);
  }

  function setPlayerNames(input: Players) {
    setPlayers(input);
    setGameMode("game");
    setTotalRounds(60 / input.length);
    setRound(1);
    setPredictions({});
  }
  function calculateScores() {
    const playerPredictions = predictions;
    const scores = players;
    Object.keys(playerPredictions).forEach((key: string) => {
      const { prediction, errors } = playerPredictions[key];
      const name = key;

      //Calculate points from round
      let points = 0;
      if (errors === 0) points = 20 + 10 * prediction;
      else points = points - Math.abs(errors) * 10;

      //Get Index in PlayerArray
      const index = scores.findIndex((object) => {
        return object.name === name;
      });
      scores[index].points += points;
      scores[index].history.push(scores[index].points);
    });
    setPlayers(scores);
  }
  function nextPredict() {
    setPredictMode(false);
  }

  function newGame(input: string) {
    if (input === "new") {
      setPlayers([]);
      setPredictMode(true);
      setRound(1);
      setGameMode("preGame");
    } else if (input === "same") {
    }
  }

  function setPlayerPrediction(inputs: PlayerPrediction) {
    const { name, prediction, errors } = inputs;
    const obj = predictions;
    obj[name] = {
      prediction,
      errors,
    };
    setPredictions(obj);
  }
  return (
    <div className="App">
      {gameMode === "preGame" && <PreGame setGamePlayers={setPlayerNames} />}
      {gameMode === "game" && (
        <>
          <div className="w-full grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-8">
              {<Chart totalRounds={totalRounds} playerSet={players} />}
              <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:grid-cols-1 maxH">
                {players.map((item: Player) => {
                  return (
                    <PlayerCard
                      name={item.name}
                      predictionMode={predictMode}
                      key={item.name}
                      setPredictions={setPlayerPrediction}
                      round={round}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 text-right p-5">Runde {round} </div>
          </div>

          <div className="p-5 absolute bottom-0 w-full">
            <hr className="" />
            <div className="py-3 flex flex-row-reverse ">
              {predictMode ? (
                <button
                  className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    nextPredict();
                  }}
                >
                  Start round
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    nextRound();
                  }}
                >
                  {round < totalRounds ? "Next round" : "Finish"}
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {gameMode === "end" && (
        <FinishScreen players={players} newGame={newGame} />
      )}
    </div>
  );
}

export default App;
