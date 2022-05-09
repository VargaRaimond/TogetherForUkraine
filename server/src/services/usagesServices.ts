import { pg } from "../db/knex";

export async function deleteUsagesForOffer(offerId: string) {
  await pg("usages").where({ offer_id: offerId }).delete();
}
