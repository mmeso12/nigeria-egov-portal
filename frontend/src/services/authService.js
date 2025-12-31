import api from "./api";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // expects { token, user }
}

export async function register(name, email, password) {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data; // could return { message, user } or similar
}


export function saveSession(token, user) {
  localStorage.setItem("govng_token", token);
  localStorage.setItem("govng_user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("govng_token");
  localStorage.removeItem("govng_user");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("govng_user");
  return raw ? JSON.parse(raw) : null;
}
