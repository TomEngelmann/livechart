export interface Player {
  name: string;
  points: number;
  history: number[];
  color: string;
}
interface Players extends Array<Player> {}

interface FinishProps {
  players: Players;
  newGame: (s: string) => void;
}
export default function FinishScreen({ players, newGame }: FinishProps) {
  return (
    <>
      {players && (
        <div className="w-screen h-screen">
          <h1 className="text-3xl text-center p-5">Rangliste</h1>
          <hr />
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            {Object.values(players).map((item) => (
              <li key={item.name} className="text-xl text-center p-5">
                {item.name} {item.points}
              </li>
            ))}
          </ol>
          <hr />

          <div className="absolute bottom-0 right-0">
            {/*
                <button
                className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => {
                    newGame("same");
                }}
                >
                New Game same Player
                </button>
            */}
            <button
              className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
              onClick={() => {
                newGame("new");
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
