import { api } from "./client";
import type { LoginData, LoginResponse } from "../types/auth";

export async function loginUser(data: LoginData) {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}