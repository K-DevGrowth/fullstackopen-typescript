import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/Diagnoses`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/Diagnoses/${id}`);

  return data;
};

const create = async (object: Diagnosis) => {
  const { data } = await axios.post<Diagnosis>(
    `${apiBaseUrl}/Diagnosiss`,
    object,
  );

  return data;
};

export default {
  getAll,
  create,
  getOne,
};
