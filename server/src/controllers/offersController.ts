import { Controller, Route, Tags, Post, Body, Get, Put, Delete, Path } from "tsoa";
import { addNewEntry, deleteEntry, updateEntry } from "../db/services";
import { Response } from "express";
import { pg } from "../db/knex";
import {
    convertOfferApiToDb,
    convertOfferDbToApi,
    IDbOffer,
    INewOffer,
    IOffer,
    validateNewOffer, validateOffer
} from "../models/offersModels";

@Route("offers")
@Tags("Offers")
export default class OffersController extends Controller {
    TABLE: string = "offers";

    @Post()
    public async addOffer(
        @Body() offerData: INewOffer,
        res: Response
    ): Promise<void> {
        return await addNewEntry<IOffer, INewOffer, IDbOffer>(
            this.TABLE,
            offerData,
            validateNewOffer,
            convertOfferApiToDb,
            res
        );
    }

    @Get()
    public async getOffers(
    ): Promise<IOffer[]> {
        const offers: IDbOffer[] = await pg(this.TABLE).select("*").where({is_approved: true});
        return offers.map(convertOfferDbToApi);
    }

    @Get()
    public async getPendingOffers(
    ): Promise<IOffer[]> {
        const offers: IDbOffer[] = await pg(this.TABLE).select("*").where({is_approved: false});
        return offers.map(convertOfferDbToApi);
    }

    // TODO Change update to work with PARTIAL models
    @Put()
    public async acceptOffer(
        @Path() id: string,
        @Body() offerData: IOffer,
        res: Response
    ): Promise<void> {
        await updateEntry<IOffer, IDbOffer>(
            this.TABLE,
            id,
            offerData,
            validateOffer,
            convertOfferApiToDb,
            res
        );
    }

    @Delete()
    public async deleteOffer(@Path() id: string, res: Response): Promise<void> {
        await deleteEntry(this.TABLE, id, res);
    }
}
