import { Controller, Route, Tags, Post, Body, Get, Put, Delete, Path } from "tsoa";
import { addNewEntry, deleteEntry, updateEntry } from "../db/services";
import { Response } from "express";
import { pg } from "../db/knex";
import {
    convertPersonApiToDb,
    convertPersonDbToApi,
    IDbPerson,
    INewPerson,
    IPerson, IPersonContact,
    validateNewPerson, validatePerson
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
        return await addNewEntry<IPerson, INewPerson, IDbPerson>(
            this.TABLE,
            personData,
            validateNewPerson,
            convertPersonApiToDb,
            res
        );
    }

    @Get()
    public async getPerson(
        @Path() authId: string
    ): Promise<IPersonContact> {
        const person: IDbPerson[] = await pg(this.TABLE).select("*").where(authId);
        return convertPersonDbToApi(person.pop());
    }

    // TODO Change update to work with PARTIAL models
    @Put()
    public async updatePerson(
        @Path() id: string,
        @Body() personData: IPerson,
        res: Response
    ): Promise<void> {
        await updateEntry<IPerson, IDbPerson>(
            this.TABLE,
            id,
            personData,
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
