import axios, { InternalAxiosRequestConfig } from "axios";
import { User } from "oidc-client-ts";

function headerAuthorizationIntercepter(config: InternalAxiosRequestConfig) {
  const userString = sessionStorage.getItem(
    "oidc.user:http://localhost:8180/realms/demo-keycloak:next-test"
  );

  if (userString) {
    const user = User.fromStorageString(userString);
    config.headers.Authorization = user.access_token;
  }

  return config;
}

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withXSRFToken: true,
  withCredentials: true,
});

api.interceptors.request.use(headerAuthorizationIntercepter);
