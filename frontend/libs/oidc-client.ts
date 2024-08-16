import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const OidcConfigFactory = {
  createUserManager() {
    const userManager = new UserManager({
      authority: "http://localhost:8180/realms/demo-keycloak",
      client_id: "next-test",
      redirect_uri: "http://localhost:3000",
      post_logout_redirect_uri: "http://localhost:3000",
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    });

    return userManager;
  },
};

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};
