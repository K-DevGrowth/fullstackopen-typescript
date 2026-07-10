import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSesitiveEntries());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
  });
  res.json(addedPatient);
});

export default router;
