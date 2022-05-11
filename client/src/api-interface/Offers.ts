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

export interface IOfferWithVolunteerName extends IOffer {
  volunteerName: string;
}

export interface IOfferWithVolunteer extends IOfferWithVolunteerName {
  volunteerPhoneNumber: string;
  volunteerContactEmail: string;
}
