import express, { type Request, type Response } from "express";
import patientService from "../services/patientService.ts";
import type {
  NewPatientEntry,
  NonSensitivePatient,
  PatientEntry,
} from "../types.ts";
import { newPatientParse } from "../middleware.ts";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSesitiveEntries());
});

router.post(
  "/",
  newPatientParse,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

export default router;
