import { pg } from "../db/knex";
import { convertPersonDbToApi, IPerson } from "../models/peopleModels";

export async function getPersonNameIfNotAnon(id: string): Promise<string> {
  const person = await pg("people").where({ id }).select("*");
  if (person.pop().is_anonymous) {
    return "anonymous";
  }
  return person.pop().name;
}

export async function getPersonFromId(id: string): Promise<IPerson> {
  return convertPersonDbToApi(
    (await pg("people").where({ id }).select("*")).pop()
  );
}
