import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from "tsoa";
import { addNewEntry, deleteEntry, updateEntry } from "../db/services";
import { Response } from "express";
import { pg } from "../db/knex";
import {
  convertNewOfferApiToDb,
  convertOfferApiToDb,
  convertOfferDbToApi,
  IDbNewOffer,
  IDbOffer,
  INewOffer,
  IOffer,
  IOfferWithVolunteer,
  validateNewOffer,
  validateOffer,
} from "../models/offersModels";
import { deleteUsagesForOffer } from "../services/usagesServices";
import { incrementStat, StatsType } from "../services/statsServices";
import {
  getOfferWithVolunteer,
  getOfferWithVolunteerName,
  isFirstOfferForPerson,
} from "../services/offersServices";

@Route("offers")
@Tags("Offers")
export default class OffersController extends Controller {
  TABLE: string = "offers";

  @Post()
  public async addOffer(
    @Body() offerData: INewOffer,
    res: Response
  ): Promise<void> {
    await incrementStat(StatsType.TOTAL_OFFERS);
    if (await isFirstOfferForPerson(offerData.personId)) {
      await incrementStat(StatsType.ACTIVE_VOLUNTEERS);
    }

    return await addNewEntry<INewOffer, INewOffer, IDbNewOffer>(
      this.TABLE,
      offerData,
      validateNewOffer,
      convertNewOfferApiToDb,
      res
    );
  }

  @Get()
  public async getOffers(): Promise<IOfferWithVolunteer[]> {
    const offers: IDbOffer[] = await pg(this.TABLE)
      .select("*")
      .where({ is_approved: true });
    return Promise.all(
      offers.map(convertOfferDbToApi).map(getOfferWithVolunteerName)
    );
  }

  @Get()
  public async getPendingOffers() {
    const offers: IDbOffer[] = await pg(this.TABLE)
      .select("*")
      .where({ is_approved: false });
    return Promise.all(
      offers.map(convertOfferDbToApi).map(getOfferWithVolunteer)
    );
  }

  @Get()
  public async getPersonOffers(@Path() personId: string): Promise<IOffer[]> {
    const offers: IDbOffer[] = await pg(this.TABLE)
      .select("*")
      .where({ person_id: personId });
    return offers.map(convertOfferDbToApi);
  }

  @Put()
  public async acceptOffer(@Path() offerId: string): Promise<void> {
    await incrementStat(StatsType.ACTIVE_OFFERS);
    await pg(this.TABLE)
      .update({ is_approved: true }, null, {
        includeTriggerModifications: true,
      })
      .where({ id: offerId });
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
    );
  }

  @Delete()
  public async deleteOffer(
    @Path() offerId: string,
    res: Response
  ): Promise<void> {
    await deleteUsagesForOffer(offerId);
    await deleteEntry(this.TABLE, offerId, res);
  }
}
