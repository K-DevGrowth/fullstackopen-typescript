import { isNotNumber } from "./utils";

interface Exercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesValues {
  target: number;
  arr: Array<number>;
}

const parseAgruments = (args: string[]): ExercisesValues => {
  const arr = process.argv.slice(3).map((x) => Number(x));
  if (!isNotNumber(args[2]) && !arr.includes(NaN)) {
    return {
      target: Number(args[2]),
      arr,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (arr: Array<number>, target: number): Exercises => {
  const periodLength = arr.length;
  const trainingDays = arr.filter((hour) => Number(hour) !== 0).length;
  const average = arr.reduce((prev, next) => prev + next, 0) / periodLength;
  const success = average >= target;

  let rating: number = 0;
  let ratingDescription: string = "";

  switch (true) {
    case average < target / 2:
      rating = 1;
      ratingDescription = "bad";
      break;

    case average < target:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;

    case average > target:
      rating = 3;
      ratingDescription = "very good";
      break;

    default:
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, arr } = parseAgruments(process.argv);
  console.log(calculateExercises(arr, target));
} catch (error) {
  let errorMessage = "Something bad happend.";
  if (error instanceof Error) {
    errorMessage += " Erorr: " + error.message;
  }
  console.log(errorMessage);
}
