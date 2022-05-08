import * as yup from "yup";

export interface IDbUsage {
    id: string,
    person_id: string,
    offer_id: string,
    created_at: Date,
    updated_at: Date,
}

export interface INewUsage {
    person_id: string,
    offer_id: string,
}

export interface IUsage {
    id: string,
    personId: string,
    offerId: string,
    createdAt: Date,
    updatedAt: Date,
}

export const validateNewUsage = yup.object({
    person_id: yup.string().required(),
    offer_id: yup.string().required()
});

export const validateUsage = yup.object({
    id: yup.string().required(),
    person_id: yup.string().required(),
    offer_id: yup.string().required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required()
});

export const convertUsageApiToDb: (usage: IUsage) => IDbUsage = (usage) => ({
    id: usage.id,
    person_id: usage.personId,
    offer_id: usage.offerId,
    created_at: usage.createdAt,
    updated_at: usage.updatedAt,
});

export const convertUsageDbToApi: (usage: IDbUsage) => IUsage = (usage) => ({
    id: usage.id,
    personId: usage.person_id,
    offerId: usage.offer_id,
    createdAt: usage.created_at,
    updatedAt: usage.updated_at,
});