import { JwtPayload } from "jwt-decode";

export interface JWTInfo extends JwtPayload {
  realm_access: {
    roles: string[];
  };
}
