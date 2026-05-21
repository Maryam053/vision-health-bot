import { useEffect, useState } from "react";

export type Role = "admin" | "client" | "user";

const KEY = "sehatbot_auth";

export const DEMO_CREDENTIALS: Record<Role, { username: string; password: string; label: string }> = {
  admin: { username: "admin", password: "admin123", label: "Admin" },
  client: { username: "clinic", password: "clinic123", label: "Clinic Partner" },
  user: { username: "user", password: "user123", label: "User" },
};

export type AuthState = { role: Role; username: string } | null;

export function getAuth(): AuthState {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
}

export function setAuth(value: AuthState) {
  if (typeof window === "undefined") return;
  if (value) localStorage.setItem(KEY, JSON.stringify(value));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("sehatbot-auth"));
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>(null);
  useEffect(() => {
    setState(getAuth());
    const update = () => setState(getAuth());
    window.addEventListener("sehatbot-auth", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("sehatbot-auth", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return state;
}

export function login(role: Role, username: string, password: string): boolean {
  const expected = DEMO_CREDENTIALS[role];
  if (username === expected.username && password === expected.password) {
    setAuth({ role, username });
    return true;
  }
  return false;
}

export function logout() {
  setAuth(null);
}
