import React from "react";

export interface Predictions {
  name: string;
  prediction: number;
  errors: number;
}
interface PlayerProps {
  name: string;
  predictionMode: boolean;
  round: number;
  setPredictions: (input: Predictions) => void;
}
export default function PlayerCard({
  name,
  predictionMode,
  round,
  setPredictions,
}: PlayerProps) {
  const [prediction, setPrediction] = React.useState<number>(0);
  const [errors, setErrors] = React.useState(0);
  React.useEffect(() => {
    if (prediction < 0) {
      setPrediction(0);
      const obj: Predictions = {
        name: name,
        prediction: 0,
        errors: errors,
      };
      setPredictions(obj);
    } else setPredictions({ name, prediction, errors });
  }, [prediction, errors]);

  React.useEffect(() => {
    setPrediction(0);
    setErrors(0);
  }, [round]);
  return (
    <div className="p-5 shadow-md w-full">
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
