import diagnoseData from "../../data/diagnoses.ts";
import type { DiagnosisEntry } from "../types.ts";

const diagnosis: DiagnosisEntry[] = diagnoseData;

const getEntries = (): DiagnosisEntry[] => {
  return diagnosis;
};

export default { getEntries };
