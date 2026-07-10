import type { NewPatientEntry } from "./types.ts";
import { Gender } from "./types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing name/occupation");
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (params: string): params is Gender => {
  return (Object.values(Gender) as string[]).includes(params);
};

const parseGender = (str: unknown): string => {
  if (!str || !isString(str) || !isGender(str)) {
    throw new Error("Incorrect or missing gender: " + str);
  }
  return str;
};

export const parseNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const entry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };

    return entry;
  }

  throw new Error("Incorrect data: some fields are missing");
};
