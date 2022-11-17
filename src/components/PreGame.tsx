import React from "react";

export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
}
interface Players extends Array<Player> {}
interface PreGameProps {
  setGamePlayers: (input: Players) => void;
}
export default function PreGame({ setGamePlayers }: PreGameProps) {
  const [names, setNames] = React.useState<string[]>([]);
  const [playerObject, setPlayerObject] = React.useState<Player>({
    name: "",
    points: 0,
    history: [0],
    color: "black",
  });

  const inputRef = React.useRef(null);
  const colorRef = React.useRef(null);
  const [player, setPlayers] = React.useState<Players>([]);

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
              player.findIndex((x) => x.name === playerObject.name) !== -1
            }
            onClick={() => {
              if (
                playerObject.name === "" ||
                player.findIndex((x) => x.name === playerObject.name) !== -1
              )
                return;

              setPlayers((previous) => [...previous, playerObject]);
              setPlayerObject({
                name: "",
                points: 0,
                history: [0],
                color: "black",
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
          <div className="col-span-6 flex flex-col flex-start p-5 ">
            {player.map((item) => {
              return (
                <div
                  className="p-2 my-3 text-center rounded-md"
                  style={{ border: `3px solid ${item.color}` }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0"
        onClick={() => {
          setGamePlayers(player);
        }}
      >
        Start Game!
      </button>
    </div>
  );
}
