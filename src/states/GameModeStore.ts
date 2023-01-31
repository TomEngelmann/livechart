import { create } from "zustand";

interface IGameMode {
  gameMode: string;
  setGameMode: (mode: string) => void;
  totalRounds: number;
  setTotalRound: (length: number) => void;
}

interface IPlayer {
  name: string;
  points: number;
  history: number[];
  color: string;
  errors: number;
  prediction: number;
}

interface IPlayers {
  players: IPlayer[];
  addPlayer: (player: IPlayer) => void; //Add one player at a time
  deletePlayer: (name: string) => void; //Delete single players
  restartGame: () => void; //Restart clears players
  changePrediction: (name: string, errors: number) => void; //Changes Prediction attribute of a single player
  changeErrors: (name: string, errors: number) => void; //Changes Error attribute of a single player
  calculateScore: () => void; //Calculates all points after a round
  setPlayers: (players: IPlayer[]) => void; //Sets all players at once
}

export const usePlayerStore = create<IPlayers>()((set) => ({
  players: [],
  addPlayer: (player: IPlayer) => {
    set((state) => ({
      players: [
        ...state.players,
        {
          name: player.name,
          points: 0,
          history: [0],
          color: player.color,
          errors: 0,
          prediction: 0,
        },
      ],
    }));
  },
  setPlayers: (players: IPlayer[]) => {
    set(() => ({
      players: players,
    }));
  },
  deletePlayer: (name) => {
    set((state) => ({
      players: state.players.filter((player: IPlayer) => {
        return player.name !== name;
      }),
    }));
  },
  restartGame: () => {
    set((state) => ({
      players: [],
    }));
  },
  changePrediction: (name: string, prediction: number) => {
    const index = 1;
    set((state) => ({
      players: state.players.map((obj: IPlayer) => {
        if (obj.name === name) {
          obj.prediction = prediction;
        }
        return obj;
      }),
    }));
  },
  changeErrors: (name: string, errors: number) => {
    set((state) => ({
      players: state.players.map((obj: IPlayer) => {
        if (obj.name === name) {
          obj.errors = errors;
        }
        return obj;
      }),
    }));
  },
  calculateScore: () => {
    set((state) => ({
      players: state.players.map((obj: IPlayer) => {
        const { prediction, errors } = obj;

        //Calculate points from round
        let points = 0;
        if (errors === 0) points = 20 + 10 * prediction;
        else points = points - Math.abs(errors) * 10;

        obj.points += points;
        obj.history.push(obj.points);
        obj.errors = 0;
        obj.prediction = 0;
        return obj;
      }),
    }));
  },
}));

export const useGameModeStore = create<IGameMode>()((set) => ({
  gameMode: "preGame",
  totalRounds: 0,
  setGameMode: (mode: string) => set(() => ({ gameMode: mode })),
  setTotalRound: (length: number) => set(() => ({ totalRounds: 60 / length })),
}));
