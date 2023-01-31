import React from "react";
import "./App.css";
import Chart from "./components/Chart";
import FinishScreen from "./components/FinishScreen";
import Game from "./components/Game";
import PlayerCard from "./components/PlayerCard";
import PreGame from "./components/PreGame";

import { useGameModeStore, usePlayerStore } from "./states";
export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
  errors: 0;
  prediction: 0;
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
function getLS(key: string, defVal: any) {
  let value = localStorage.getItem(key);

  if (typeof value === "string" && key !== "gameMode") {
    value = JSON.parse(value); // ok
  }
  return value || defVal;
}
function App() {
  const { gameMode, setGameMode } = useGameModeStore();
  return (
    <div className="App">
      {gameMode === "preGame" && <PreGame />}
      {gameMode === "game" && <Game />}

      {gameMode === "end" && <FinishScreen />}
    </div>
  );
}

export default App;
