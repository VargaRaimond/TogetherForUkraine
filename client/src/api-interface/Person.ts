export interface INewPerson {
  id: string;
  name: string;
  emailContact: string;
  phoneNumber: string;
}

export interface IPerson extends INewPerson {
  createdAt: Date;
  updatedAt: Date;
}
