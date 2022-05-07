import { User } from "@auth0/auth0-react";

export enum UserRoles {
  Guest = "guest",
  Refugee = "refugee",
  Volunteer = "volunteer",
  Admin = "admin",
}

export interface IRolesObject {
  isVolunteer: boolean;
  isAdmin: boolean;
  isRefugee: boolean;
  isGuest: boolean;
}

export const getUserRoles: (user: User | undefined) => string[] = (user) => {
  const namespace = "https://localhost:5001";
  const userRoles: any[] = user ? user[`${namespace}/roles`] : ["guest"];

  return userRoles;
};

export const getUserRolesObject: (user: User | undefined) => IRolesObject = (
  user
) => {
  const namespace = "https://localhost:5001";
  const userRoles: any[] = user ? user[`${namespace}/roles`] : ["guest"];

  const roles = {
    isVolunteer: false,
    isAdmin: false,
    isRefugee: false,
    isGuest: false,
  };

  userRoles.forEach((role) => {
    switch (role) {
      case "volunteer":
        roles.isVolunteer = true;
        break;
      case "admin":
        roles.isAdmin = true;
        break;
      case "refugee":
        roles.isRefugee = true;
        break;
      case "guest":
        roles.isGuest = true;
    }
  });

  return roles;
};
