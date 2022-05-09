import * as yup from "yup";

export interface IDbPerson extends IDbNewPerson {
  created_at: Date;
  updated_at: Date;
}

export interface IDbNewPerson {
  id: string;
  name: string;
  email_contact: string;
  phone_number: string;
}

export interface INewPerson {
  id: string;
  name: string;
  emailContact: string;
  phoneNumber: string;
}

export interface IPerson {
  id: string;
  name: string;
  emailContact: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPersonContact {
  id: string;
  emailContact: string;
  phoneNumber: string;
}

export const validateNewPerson = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  emailContact: yup.string().required(),
  phoneNumber: yup.string().required(),
});

export const validatePerson = yup.object({
  id: yup.string().required(),
  name: yup.string(),
  emailContact: yup.string(),
  phoneNumber: yup.string(),
});

export const convertPersonApiToDb: (person: IPerson) => IDbPerson = (
  person
) => ({
  id: person.id,
  name: person.name,
  email_contact: person.emailContact,
  phone_number: person.phoneNumber,
  created_at: person.createdAt,
  updated_at: person.updatedAt,
});

export const convertNewPersonApiToDb: (person: INewPerson) => IDbNewPerson = (
  person
) => ({
  id: person.id,
  name: person.name,
  email_contact: person.emailContact,
  phone_number: person.phoneNumber,
});

export const convertPersonDbToApi: (person: IDbPerson) => IPerson = (
  person
) => ({
  id: person.id,
  name: person.name,
  emailContact: person.email_contact,
  phoneNumber: person.phone_number,
  createdAt: person.created_at,
  updatedAt: person.updated_at,
});
