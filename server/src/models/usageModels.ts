import * as yup from "yup";

export interface IDbUsage extends IDbNewUsage {
    id: string,
    created_at: Date,
    updated_at: Date,
}

export interface IDbNewUsage {
    person_id: string,
    offer_id: string,
}

export interface INewUsage {
    personId: string,
    offerId: string,
}

export interface IUsage {
    id: string,
    personId: string,
    offerId: string,
    createdAt: Date,
    updatedAt: Date,
}

export const validateNewUsage = yup.object({
    personId: yup.string().required(),
    offerId: yup.string().required()
});

export const validateUsage = yup.object({
    id: yup.string().required(),
    personId: yup.string().required(),
    offerId: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
});

export const convertUsageApiToDb: (usage: IUsage) => IDbUsage = (usage) => ({
    id: usage.id,
    person_id: usage.personId,
    offer_id: usage.offerId,
    created_at: usage.createdAt,
    updated_at: usage.updatedAt,
});

export const convertNewUsageApiToDb: (usage: INewUsage) => IDbNewUsage = (usage) => ({
    person_id: usage.personId,
    offer_id: usage.offerId
});

export const convertUsageDbToApi: (usage: IDbUsage) => IUsage = (usage) => ({
    id: usage.id,
    personId: usage.person_id,
    offerId: usage.offer_id,
    createdAt: usage.created_at,
    updatedAt: usage.updated_at,
});
