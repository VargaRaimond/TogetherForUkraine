import {
  Controller,
  Route,
  Tags,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Path,
} from "tsoa";
import { addNewEntry, deleteEntry, updateEntry } from "../db/services";
import { Response } from "express";
import { pg } from "../db/knex";
import {
  convertNewPersonApiToDb,
  convertPersonApiToDb,
  convertPersonDbToApi,
  IDbNewPerson,
  IDbPerson,
  INewPerson,
  IPerson,
  IPersonContact,
  validateNewPerson,
  validatePerson,
} from "../models/peopleModels";

@Route("person")
@Tags("Person")
export default class PersonController extends Controller {
  TABLE: string = "people";

  @Post()
  public async addPerson(
    @Body() personData: INewPerson,
    res: Response
  ): Promise<void> {
    return await addNewEntry<INewPerson, INewPerson, IDbNewPerson>(
      this.TABLE,
      personData,
      validateNewPerson,
      convertNewPersonApiToDb,
      res
    );
  }

  @Get()
  public async getPersonContact(@Path() id: string): Promise<IPersonContact> {
    const person: IDbPerson[] = await pg(this.TABLE).select("*").where({ id });
    return convertPersonDbToApi(person.pop());
  }

  @Get()
  public async getPerson(@Path() id: string): Promise<IPerson> {
    const person: IDbPerson[] = await pg(this.TABLE).select("*").where({ id });
    return convertPersonDbToApi(person.pop());
  }

  @Put()
  public async updatePerson(
    @Path() id: string,
    @Body() personData: Partial<IPerson>,
    res: Response
  ): Promise<void> {
    await updateEntry<IPerson, IDbPerson>(
      this.TABLE,
      id,
      { ...personData, id },
      validatePerson,
      convertPersonApiToDb,
      res
    );
  }

  @Delete()
  public async deletePerson(@Path() id: string, res: Response): Promise<void> {
    await deleteEntry(this.TABLE, id, res);
  }
}
