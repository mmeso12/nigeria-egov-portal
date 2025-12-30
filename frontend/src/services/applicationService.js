import api from "./api";

export async function submitApplication(type, data) {
  const res = await api.post("/applications", { type, data });
  return res.data; // expects { message, application }
}
