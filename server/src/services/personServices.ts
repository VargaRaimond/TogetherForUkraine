import { pg } from "../db/knex";
import { convertPersonDbToApi, IPerson } from "../models/peopleModels";

export async function getPersonNameIfNotAnon(id: string): Promise<string> {
  return (await pg("people").where({ id }).select("*")).pop().name;
}

export async function getPersonFromId(id: string): Promise<IPerson> {
  return convertPersonDbToApi(
    (await pg("people").where({ id }).select("*")).pop()
  );
}
