import type { Diary } from "./type";

const baseUrl = "/api/diaries";

export const getAll = async (): Promise<Diary[]> => {
  const res = await fetch(baseUrl);
  return res.json();
};

export const create = async (params: object): Promise<Diary> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.error.map((e: { message: string }) => e.message).join(", ") ||
        `Request failed with status ${res.status}`,
    );
  }

  return res.json();
};
