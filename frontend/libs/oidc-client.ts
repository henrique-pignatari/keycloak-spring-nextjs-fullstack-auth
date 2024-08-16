import { OIDC_AUTHORITY, OIDC_CLIENT } from "@/constants/env";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const OidcConfigFactory = {
  createUserManager() {
    if (OIDC_CLIENT && OIDC_AUTHORITY) {
      const userManager = new UserManager({
        authority: OIDC_AUTHORITY,
        client_id: OIDC_CLIENT,
        redirect_uri: window.origin,
        post_logout_redirect_uri: window.origin,
        userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      });

      return userManager;
    }
  },
};

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};
