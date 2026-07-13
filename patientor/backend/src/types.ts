import type { z } from "zod";
import type { NewPatientSchema, BaseEntrySchema } from "./middleware.ts";

export type Code =
  | "M24.2"
  | "M51.2"
  | "S03.5"
  | "J10.1"
  | "J06.9"
  | "Z57.1"
  | "N30.0"
  | "H54.7"
  | "J03.0"
  | "L60.1"
  | "Z74.3"
  | "L20"
  | "F43.2"
  | "S62.5"
  | "H35.29";

export interface DiagnosisEntry {
  code: Code;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type NewEntryPatient = z.infer<typeof BaseEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry["code"]>;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: object;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: object;
}

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
