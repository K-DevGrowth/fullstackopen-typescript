import { isNotNumber } from "./utils.js";

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

interface Rating {
  rating: number;
  ratingDescription: string;
}

const parseAgruments = (args: string[]): ExercisesValues => {
  const arr = args.slice(3).map((x) => Number(x));
  if (!isNotNumber(args[2]) && !arr.includes(NaN)) {
    return {
      target: Number(args[2]),
      arr,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const getRating = (average: number, target: number): Rating => {
  if (average < target / 2) {
    return { rating: 1, ratingDescription: "bad" };
  }
  if (average < target) {
    return { rating: 2, ratingDescription: "not too bad but could be better" };
  }
  return { rating: 3, ratingDescription: "very good" };
};

export const calculateExercises = (
  arr: Array<number>,
  target: number,
): Exercises => {
  const periodLength = arr.length;
  const trainingDays = arr.filter((hour) => Number(hour) !== 0).length;
  const average = arr.reduce((prev, next) => prev + next, 0) / periodLength;
  const success = average >= target;
  const { rating, ratingDescription } = getRating(average, target);

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

if (process.argv[1] === import.meta.filename) {
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
}
