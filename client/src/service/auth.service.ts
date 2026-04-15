import axios from 'axios';

import { API_URL, LOGIN_URL } from '../util/const';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  message?: string;
  company?: string;
  user?: {
    username?: string;
    name?: string;
    names?: string;
    document?: string;
    company?: string;
  };
  [key: string]: unknown;
}



export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`${LOGIN_URL}/login`, {
    username: payload.username.trim(),
    password: payload.password,
  });

  return response.data;
}

export interface SeguimientoLoginPayload {
  nombre: string;
  cedula: string;
  empresa: string;
}

export async function registerLoginSeguimiento(payload: SeguimientoLoginPayload): Promise<void> {
  await axios.post(`${API_URL}/Seguimiento/Login`, payload);
}

export function getApiBaseUrl(): string {
  return API_URL;
}
