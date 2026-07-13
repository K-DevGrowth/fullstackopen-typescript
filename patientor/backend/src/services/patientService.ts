import patientsData from "../../data/patients.ts";
import type {
  NonSensitivePatient,
  NewPatientEntry,
  PatientEntry,
  Entry,
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

const getPatient = (id: string): PatientEntry | undefined => {
  const patient = patientsData.find((patient) => patient.id === id);
  return patient;
};

const addEntryToPatient = (id: string, entry: Entry): Entry => {
  const patient = patientsData.find((patient) => patient.id === id);

  if (!patient) {
    throw new Error("Not found patient");
  }

  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    ...entry,
    id: uuid(),
    ssn: "",
    entries: [],
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSesitiveEntries,
  addPatient,
  getPatient,
  addEntryToPatient,
};
