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
