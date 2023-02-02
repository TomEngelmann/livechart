import { useGameModeStore, usePlayerStore } from "../states";
import Chart from "./Chart";

export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
}
interface Players extends Array<Player> {}

export default function FinishScreen() {
  const { players, restartGame } = usePlayerStore();
  const sortedPlayers = players.sort((a, b) => (a.points > b.points ? -1 : 1));
  const { setGameMode } = useGameModeStore();
  function newGame() {
    restartGame();
    setGameMode("preGame");
  }
  return (
    <>
      {players && (
        <div className="w-screen h-screen">
          <h1 className="text-3xl text-center p-5">Rangliste</h1>
          <hr />
          <ol
            className="pl-5 mt-2 space-y-1 list-decimal list-inside maxH"
            style={{ maxHeight: "40vh" }}
          >
            {Object.values(sortedPlayers).map((item) => (
              <li key={item.name} className="text-xl text-center p-5">
                {item.name} {item.points}
              </li>
            ))}
          </ol>
          <hr />
          <div className="w-full grid grid-cols-12">
            <div className="col-span-3  w-50"></div>
            <div className="col-span-6 flex flex-col flex-start p-5  maxH">
              {<Chart />}
            </div>
            <div className="col-span-3"></div>
          </div>
          <div className="absolute bottom-0 right-0">
            <button
              className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
              onClick={() => {
                newGame();
              }}
            >
              Neues Spiel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
