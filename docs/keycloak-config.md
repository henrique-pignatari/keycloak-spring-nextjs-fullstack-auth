1. Enter at [keycloack admin console](http://localhost:8180/admin)

2. Login wiht credentials:

- username: admin
- password: admin

3. Select the `demo-keycloak` realm
   ![kc_realm_select](./images/kc_realm_select.png)

4. Enter `Users` tab and click on `Add user`

5. Insert user info:

> You may create how many users you wish, but I recommend 2, one user and one admin, this will help to teste the RBAC latter on.

![kc_user_create](./images/kc_user_create.png)

6. Next click on the user and enter `Role mapping` tab and clock `Assign role`:
   ![kc_user_roles_tab](./images/kc_user_roles_tab.png)

7. At the popup assign `ADMIN` or `USER`:
   ![kc_user_roles_assign](./images/kc_user_roles_assign.png)

8. And to finish, enter `Credential` tab and clock `Set password`:
   ![kc_user_creadentials_tab](./images/kc_user_creadentials_tab.png)

9 Set a password:
![kc_user_credentials_set](./images/kc_user_credentials_set.png)
