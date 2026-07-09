import { isNotNumber } from "./utils.js";

interface BmiValues {
  heightCm: number;
  weightKg: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enought arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (heightCm: number, weightKg: number) => {
  const heightM = heightCm / 100;
  const result = weightKg / (heightM * heightM);

  switch (true) {
    case result < 16.0:
      return "Underweight (Severe thinness)";
    case result < 17.0:
      return "Underweight (Moderate thinness)";
    case result < 18.5:
      return "Underweight (Mild thinness)";
    case result < 25.0:
      return "Normal range";
    case result < 30.0:
      return "Overweight (Pre-obese)";
    case result < 35.0:
      return "Obese (Class I)";
    case result < 40.0:
      return "Obese (Class II)";
    case result >= 40.0:
      return "Obese (Class III)";
    default:
      throw new Error("Please provided a number");
  }
};

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
  try {
    const { heightCm, weightKg } = parseArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
  } catch (error) {
    let errorMessage = "Something bad happend.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
