import { API_HOST, OIDC_AUTHORITY, OIDC_CLIENT } from "@/constants/env";
import axios, { InternalAxiosRequestConfig } from "axios";
import { User } from "oidc-client-ts";

function headerAuthorizationIntercepter(config: InternalAxiosRequestConfig) {
  const userString = sessionStorage.getItem(`oidc.user:${OIDC_AUTHORITY}:${OIDC_CLIENT}`);

  if (userString) {
    const user = User.fromStorageString(userString);
    config.headers.Authorization = "Bearer " + user.access_token;
  }

  return config;
}

export const api = axios.create({
  baseURL: API_HOST,
  withXSRFToken: true,
  withCredentials: true,
});

api.interceptors.request.use(headerAuthorizationIntercepter);
