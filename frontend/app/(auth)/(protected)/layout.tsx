"use client";
import { withAuthenticationRequired } from "react-oidc-context";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <div>{children}</div>;
}

export default withAuthenticationRequired(ProtectedLayout, {
  OnRedirecting: () => <div>Redirecting to the login page...</div>,
});
