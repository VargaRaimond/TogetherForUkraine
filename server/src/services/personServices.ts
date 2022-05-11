import { pg } from "../db/knex";

export async function getPersonNameFromOffer(id: string): Promise<string> {
  const person = await pg("people").where({ id }).select("*");
  return person.pop().name;
}
