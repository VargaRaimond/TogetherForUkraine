import { pg } from "../db/knex";
import { IOffer, IOfferWithVolunteer } from "../models/offersModels";
import { getPersonFromId, getPersonNameIfNotAnon } from "./personServices";

export async function incrementOfferRefugeesCount(offerId: string) {
  await pg("offers").where({ id: offerId }).increment("current_refugees_count");
}

export async function isFirstOfferForPerson(personId: string) {
  const offersForPerson = await pg("offers")
    .where({ person_id: personId })
    .select("*");
  return offersForPerson.length === 0;
}

export async function isOfferFilled(offerId: string) {
  const offer: [number, number] = (
    await pg("offers")
      .where({ offer_id: offerId })
      .select(["max_refugees_count", "current_refugees_count"])
  ).pop();
  return offer[0] === offer[1];
}

export async function getOfferWithVolunteerName(
  offer: IOffer
): Promise<IOfferWithVolunteer> {
  const personName = await getPersonNameIfNotAnon(offer.personId);
  return {
    volunteerName: personName,
    ...offer,
  } as IOfferWithVolunteer;
}

export async function getOfferWithVolunteer(offer: IOffer) {
  const person = await getPersonFromId(offer.personId);
  return {
    volunteerName: person.name,
    volunteerPhoneNumber: person.phoneNumber,
    volunteerContactEmail: person.emailContact,
    ...offer,
  };
}
