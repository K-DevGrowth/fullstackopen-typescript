import patientsData from "../../data/patients.ts";
import type {
  NonSensitivePatient,
  NewPatientEntry,
  PatientEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getNonSesitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getNonSesitiveEntries, addPatient };
