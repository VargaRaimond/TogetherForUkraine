import { Controller, Route, Tags, Post, Body, Get, Put, Delete, Path } from "tsoa";
import { addNewEntry, deleteEntry, updateEntry } from "../db/services";
import { Response } from "express";
import { pg } from "../db/knex";
import {
    convertNewOfferApiToDb,
    convertOfferApiToDb,
    convertOfferDbToApi, IDbNewOffer,
    IDbOffer,
    INewOffer,
    IOffer,
    validateNewOffer, validateOffer
} from "../models/offersModels";
import {deleteUsagesForOffer} from "../services/usagesServices";

@Route("offers")
@Tags("Offers")
export default class OffersController extends Controller {
    TABLE: string = "offers";

    @Post()
    public async addOffer(
        @Body() offerData: INewOffer,
        res: Response
    ): Promise<void> {
        return await addNewEntry<INewOffer, INewOffer, IDbNewOffer>(
            this.TABLE,
            offerData,
            validateNewOffer,
            convertNewOfferApiToDb,
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

    @Get()
    public async getPersonOffers(
        @Path() personId: string,
    ): Promise<IOffer[]> {
        const offers: IDbOffer[] = await pg(this.TABLE).select("*").where({person_id: personId});
        return offers.map(convertOfferDbToApi);
    }

    @Put()
    public async acceptOffer(
        @Path() offerId: string
    ): Promise<void> {
        await pg(this.TABLE).update({is_approved: true}, null, { includeTriggerModifications: true }).where({id: offerId});
    }

    @Put()
    public async updateOffer(
        @Path() offerId: string,
        @Body() offerData: Partial<IOffer>,
        res: Response
    ): Promise<void> {
        await updateEntry<IOffer, IDbOffer>(
            this.TABLE,
            offerId,
            offerData,
            validateOffer,
            convertOfferApiToDb,
            res
        );}

    @Delete()
    public async deleteOffer(@Path() offerId: string, res: Response): Promise<void> {
        await deleteUsagesForOffer(offerId);
        await deleteEntry(this.TABLE, offerId, res);
    }
}
