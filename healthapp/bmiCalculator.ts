const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const result =  weightKg / (heightM * heightM);

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
}

console.log(calculateBmi(180, 74))