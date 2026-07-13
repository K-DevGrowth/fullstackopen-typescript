import express, { type Request, type Response } from "express";
import patientService from "../services/patientService.ts";
import type {
  Entry,
  NewPatientEntry,
  NonSensitivePatient,
  PatientEntry,
} from "../types.ts";
import { newEntryParse, newPatientParse } from "../middleware.ts";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSesitiveEntries());
});

router.get("/:id", (req, res: Response<PatientEntry>) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post(
  "/:id/entries",
  newEntryParse,
  (req: Request<{ id: string }, unknown, Entry>, res: Response<Entry>) => {
    const addedPatientEntry = patientService.addEntryToPatient(
      req.params.id,
      req.body,
    );
    res.json(addedPatientEntry);
  },
);

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
