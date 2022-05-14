export enum MessageType {
  OFFER_ACCEPTED = "OFFER_ACCEPTED",
  OFFER_DECLINED = "OFFER_DECLINED",
  OFFER_REMOVED = "OFFER_REMOVED",
  NEW_APPLICANT_VOLUNTEER = "NEW_APPLICANT_VOLUNTEER",
  NEW_APPLICANT_REFUGEE = "NEW_APPLICANT_REFUGEE",
}

export interface IOfferActionMail {
  volunteerContactEmail: string;
  volunteerName: string;
  offerTitle: string;
}
export interface IOfferActionMailWithoutName {
  volunteerContactEmail: string;
  volunteerId: string;
  offerTitle: string;
}
