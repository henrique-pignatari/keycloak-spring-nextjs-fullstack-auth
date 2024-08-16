"use client";
import { onSigninCallback, OidcConfigFactory } from "@/libs/oidc-client";
import { useEffect, useState } from "react";
import { AuthProvider } from "react-oidc-context";
import { Header } from "./_components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <AuthProvider
      userManager={OidcConfigFactory.createUserManager()}
      onSigninCallback={onSigninCallback}
    >
      <Header />
      {children}
    </AuthProvider>
  );
}
