import { User } from "@auth0/auth0-react";

export const getUserRoles: (user: User | undefined) => string[] = (user) => {
  const namespace = "https://localhost:5001";
  const userRoles: any[] = user ? user[`${namespace}/roles`] : ["guest"];

  return userRoles;
};
