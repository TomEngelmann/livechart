import React from "react";
import { usePlayerStore, useGameModeStore } from "../states";
export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
  errors: number;
  prediction: number;
}
interface Players extends Array<Player> {}

export default function PreGame() {
  const { addPlayer, deletePlayer } = usePlayerStore();
  const { setGameMode, setTotalRound } = useGameModeStore();

  const [playerObject, setPlayerObject] = React.useState<Player>({
    name: "",
    points: 0,
    history: [0],
    color: "black",
    errors: 0,
    prediction: 0,
  });

  const inputRef = React.useRef(null);
  const colorRef = React.useRef(null);
  const { players } = usePlayerStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPlayerObject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen">
      <h1 className="text-3xl text-center">Wizard Live Chart</h1>
      <hr />
      <div className="flex flex-col ">
        <h3 className="text-xl text-center p-5">Spielername eingeben</h3>
        <div className="flex flex-row justify-center items-center p-5">
          <input
            className="shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-2"
            onChange={(e) => {
              handleChange(e);
            }}
            name="name"
            type="text"
            ref={inputRef}
            autoComplete="off"
            placeholder="Name"
          />
          <input
            className="border-solid "
            onChange={(e) => handleChange(e)}
            name="color"
            type="color"
            ref={colorRef}
          />
          <button
            className="bg-blue-500 disabled:opacity-25 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={
              playerObject.name === "" ||
              players.findIndex((x) => x.name === playerObject.name) !== -1
            }
            onClick={() => {
              if (
                playerObject.name === "" ||
                players.findIndex((x) => x.name === playerObject.name) !== -1
              )
                return;
              addPlayer(playerObject);
              setPlayerObject({
                name: "",
                points: 0,
                history: [0],
                color: "black",
                errors: 0,
                prediction: 0,
              });
              // @ts-ignore (us this comment if typescript raises an error)
              inputRef.current.value = "";
              // @ts-ignore (us this comment if typescript raises an error)
              colorRef.current.value = "";
            }}
          >
            Add to Game!
          </button>
        </div>
        <hr />
        <div className="w-full grid grid-cols-12">
          <div className="col-span-3"></div>
          <div className="col-span-6 flex flex-col flex-start p-5  maxH">
            {players.map((item) => {
              return (
                <div
                  key={item.name}
                  className="p-2 my-3 rounded-md flex flex-row justify-between"
                  style={{ border: `3px solid ${item.color}` }}
                >
                  <p>{item.name}</p>
                  <p className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                      onClick={(e: any) => {
                        deletePlayer(item.name);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>

      <button
        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0 disabled:opacity-50"
        disabled={60 % players.length !== 0 || players.length < 3}
        onClick={() => {
          setGameMode("game");
          setTotalRound(60 / players.length);
        }}
      >
        Start Game!
      </button>
    </div>
  );
}
