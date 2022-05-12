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
  const { max_refugees_count, current_refugees_count } = (
    await pg("offers")
      .where({ id: offerId })
      .select(["max_refugees_count", "current_refugees_count"])
  ).pop() as { max_refugees_count: number; current_refugees_count: number };

  return max_refugees_count === current_refugees_count;
}

export async function getOfferWithVolunteerName(
  offer: IOffer
): Promise<IOfferWithVolunteer> {
  return {
    volunteerName: offer.isAnonymous
      ? "Anonymous"
      : await getPersonNameIfNotAnon(offer.personId),
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
