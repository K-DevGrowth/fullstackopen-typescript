import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.status(200).send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const targetNum = Number(target);
  if (
    isNaN(targetNum) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    !daily_exercises.every((x: unknown) => typeof x === "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    daily_exercises as Array<number>,
    targetNum,
  );

  return res.status(200).json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
