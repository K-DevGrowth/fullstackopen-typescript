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
}

export type NonSensitivePatient = Omit<PatientEntry, "ssn">[];

export type NewPatientEntry = Omit<PatientEntry, "id">[];
