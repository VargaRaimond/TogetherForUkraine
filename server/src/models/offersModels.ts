import * as yup from "yup";

export interface IDbOffer {
    id: string,
    person_id: string,
    title: string,
    description: string,
    location: string,
    category: string,
    max_refugees_count: number,
    current_refugees_count: number,
    is_anonymous: boolean,
    preffered_contact_method: string,
    is_approved: boolean,
    created_at: Date,
    updated_at: Date,
}

export interface INewOffer {
    person_id: string,
    title: string,
    description: string,
    location: string,
    category: string,
    max_refugees_count: number,
    current_refugees_count: number,
    is_anonymous: boolean,
    preffered_contact_method: string,
}

export interface IOffer {
    id: string,
    personId: string,
    title: string,
    description: string,
    location: string,
    category: string,
    maxRefugeesCount: number,
    currentRefugeesCount: number,
    isAnonymous: boolean,
    prefferedContactMethod: string,
    isApproved: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export const validateNewOffer = yup.object({
    person_id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().required(),
    category: yup.string().required(),
    max_refugees_count: yup.number().required(),
    current_refugees_count: yup.number().required(),
    is_anonymous: yup.boolean().required(),
    preffered_contact_method: yup.string().required(),
});

export const validateOffer = yup.object({
    id: yup.string().required(),
    person_id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().required(),
    category: yup.string().required(),
    max_refugees_count: yup.number().required(),
    current_refugees_count: yup.number().required(),
    is_anonymous: yup.boolean().required(),
    preffered_contact_method: yup.string().required(),
    is_approved: yup.boolean().required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required()
});

export const convertOfferApiToDb: (offer: IOffer) => IDbOffer = (offer) => ({
    id: offer.id,
    person_id: offer.personId,
    title: offer.title,
    description: offer.description,
    location: offer.location,
    category: offer.category,
    max_refugees_count: offer.maxRefugeesCount,
    current_refugees_count: offer.currentRefugeesCount,
    is_anonymous: offer.isAnonymous,
    preffered_contact_method: offer.prefferedContactMethod,
    is_approved: offer.isApproved,
    created_at: offer.createdAt,
    updated_at: offer.updatedAt
});

export const convertOfferDbToApi: (offer: IDbOffer) => IOffer = (offer) => ({
    id: offer.id,
    personId: offer.person_id,
    title: offer.title,
    description: offer.description,
    location: offer.location,
    category: offer.category,
    maxRefugeesCount: offer.max_refugees_count,
    currentRefugeesCount: offer.current_refugees_count,
    isAnonymous: offer.is_anonymous,
    prefferedContactMethod: offer.preffered_contact_method,
    isApproved: offer.is_approved,
    createdAt: offer.created_at,
    updatedAt: offer.updated_at
});
