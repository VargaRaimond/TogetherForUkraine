import {pg} from "../db/knex";

export async function incrementRefugeesCount(offerId: string) {
    await pg("offers")
        .where({ id: offerId })
        .increment("current_refugees_count");
}
