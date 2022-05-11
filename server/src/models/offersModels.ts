import * as yup from "yup";

export interface IDbNewOffer {
  person_id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  max_refugees_count: number;
  current_refugees_count: number;
  is_anonymous: boolean;
  preferred_contact_method: string;
}

export interface IDbOffer extends IDbNewOffer {
  id: string;
  created_at: Date;
  updated_at: Date;
  is_approved: boolean;
}

export interface INewOffer {
  personId: string;
  title: string;
  description: string;
  location: string;
  category: string;
  maxRefugeesCount: number;
  currentRefugeesCount: number;
  isAnonymous: boolean;
  preferredContactMethod: string;
}

export interface IOffer {
  id: string;
  personId: string;
  title: string;
  description: string;
  location: string;
  category: string;
  maxRefugeesCount: number;
  currentRefugeesCount: number;
  isAnonymous: boolean;
  preferredContactMethod: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOfferWithVolunteer extends IOffer {
  volunteerName: string;
}

export const validateNewOffer = yup.object({
  personId: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
  category: yup.string().required(),
  maxRefugeesCount: yup.number().required(),
  currentRefugeesCount: yup.number().required(),
  isAnonymous: yup.boolean().required(),
  preferredContactMethod: yup.string().required(),
});

export const validateOffer = yup.object({
  id: yup.string(),
  personId: yup.string(),
  title: yup.string(),
  description: yup.string(),
  location: yup.string(),
  category: yup.string(),
  maxRefugeesCount: yup.number(),
  currentRefugeesCount: yup.number(),
  isAnonymous: yup.boolean(),
  preferredContactMethod: yup.string(),
  isApproved: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
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
  preferred_contact_method: offer.preferredContactMethod,
  is_approved: offer.isApproved,
  created_at: offer.createdAt,
  updated_at: offer.updatedAt,
});

export const convertNewOfferApiToDb: (offer: INewOffer) => IDbNewOffer = (
  offer
) => ({
  person_id: offer.personId,
  title: offer.title,
  description: offer.description,
  location: offer.location,
  category: offer.category,
  max_refugees_count: offer.maxRefugeesCount,
  current_refugees_count: offer.currentRefugeesCount,
  is_anonymous: offer.isAnonymous,
  preferred_contact_method: offer.preferredContactMethod,
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
  preferredContactMethod: offer.preferred_contact_method,
  isApproved: offer.is_approved,
  createdAt: offer.created_at,
  updatedAt: offer.updated_at,
});
