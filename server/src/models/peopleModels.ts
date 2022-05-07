import * as yup from "yup";

export interface IDbPerson {
    id: string,
    auth_id: string,
    name: string,
    email_contact: string,
    phone_number: string,
    created_at: Date,
    updated_at: Date,
}

export interface INewPerson {
    auth_id: string,
    name: string,
    email_contact: string,
    phone_number: string,
}

export interface IPerson {
    id: string,
    authId: string,
    name: string,
    emailContact: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IPersonContact {
    id: string,
    emailContact: string,
    phoneNumber: string,
}

export const validateNewPerson = yup.object({
    auth_id: yup.string().required(),
    name: yup.string().required(),
    email_contact: yup.string().required(),
    phone_number: yup.string().required(),
});

export const validatePerson = yup.object({
    id: yup.string().required(),
    auth_id: yup.string().required(),
    name: yup.string().required(),
    email_contact: yup.string().required(),
    phone_number: yup.string().required(),
});

export const convertPersonApiToDb: (person: IPerson) => IDbPerson = (person) => ({
    id: person.id,
    auth_id: person.authId,
    name: person.name,
    email_contact: person.emailContact,
    phone_number: person.phoneNumber,
    created_at: person.createdAt,
    updated_at: person.updatedAt,
});

export const convertPersonDbToApi: (person: IDbPerson) => IPerson = (person) => ({
    id: person.id,
    authId: person.auth_id,
    name: person.name,
    emailContact: person.email_contact,
    phoneNumber: person.phone_number,
    createdAt: person.created_at,
    updatedAt: person.updated_at,
});
