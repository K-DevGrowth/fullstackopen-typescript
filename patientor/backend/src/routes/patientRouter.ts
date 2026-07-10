import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";
import { parseNewPatient } from "../utils.ts";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSesitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
