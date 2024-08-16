import { JWTInfo } from "@/types/jwtInfo";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthContextProps, useAuth } from "react-oidc-context";

function FallBackComponent() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
}

function hasRequiredPermissions(auth: AuthContextProps, requiredPermissions: string[]): boolean {
  if (auth.isAuthenticated && auth.user) {
    const token = auth.user.access_token;
    const info = jwtDecode<JWTInfo>(token);
    const { roles: userPermissions } = info.realm_access;
    return requiredPermissions.some((permission) => userPermissions.includes(permission));
  }
  return false;
}

export function withRoles(Component: any, requiredPermissions: string[]) {
  return function WithRolesWrapper(props: any) {
    const auth = useAuth();

    const hasPermission = hasRequiredPermissions(auth, requiredPermissions);
    if (hasPermission) {
      return <Component {...props} />;
    } else {
      return <FallBackComponent />;
    }
  };
}
