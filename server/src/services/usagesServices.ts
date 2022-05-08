import {pg} from "../db/knex";

export async function deleteUsagesForOffer(offerId: string) {
    await pg("usages")
        .where({ offer_id: offerId })
        .delete();
}

export async function isFirstUsageForPerson(personId: string) {
    const usagesForPerson = await pg("usages")
        .where({ person_id: personId })
        .select("*");
    return usagesForPerson.length === 0;
}