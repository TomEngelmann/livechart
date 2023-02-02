import React from "react";
import { usePlayerStore } from "../states";

export interface Predictions {
  name: string;
  prediction: number;
  errors: number;
}
interface PlayerProps {
  name: string;
  predictionMode: boolean;
  round: number;
  color: string;
}
export default function PlayerCard({
  name,
  predictionMode,
  round,
  color,
}: PlayerProps) {
  const { changeErrors, changePrediction } = usePlayerStore();
  const [prediction, setPrediction] = React.useState<number>(0);
  const [errors, setErrors] = React.useState(0);
  React.useEffect(() => {
    changeErrors(name, errors);
  }, [errors]);
  React.useEffect(() => {
    changePrediction(name, prediction);
  }, [prediction]);
  React.useEffect(() => {
    setPrediction(0);
    setErrors(0);
  }, [round]);
  return (
    <div
      className="p-5 shadow-md w-full border-solid "
      style={{ border: `3px solid ${color}` }}
    >
      <div className="flex flex-row justify-between">
        <p className="">{name}</p>
        <p>Prediction: {prediction}</p>
      </div>
      {predictionMode ? (
        <div className="flex flex-row justify-between">
          <p>Prediction: </p>
          <div className="flex row justify-between">
            <svg
              onClick={() => {
                setPrediction((prev) => {
                  return prev - 1;
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{prediction}</p>
            <svg
              onClick={() => {
                setPrediction((prev) => {
                  return prev + 1;
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <p>Falsch um: </p>
          <div className="flex row justify-between">
            <svg
              onClick={() => {
                setErrors((prev) => {
                  return prev - 1;
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{errors}</p>
            <svg
              onClick={() => {
                setErrors((prev) => {
                  return prev + 1;
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
