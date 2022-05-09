import { Body, Controller, Post, Route, Tags } from "tsoa";
import { addNewEntry } from "../db/services";
import { Response } from "express";
import {
  convertNewUsageApiToDb,
  IDbNewUsage,
  INewUsage,
  validateNewUsage,
} from "../models/usageModels";
import {
  incrementOfferRefugeesCount,
  isOfferFilled,
} from "../services/offersServices";
import { isFirstUsageForPerson } from "../services/usagesServices";
import {
  decrementStat,
  incrementStat,
  StatsType,
} from "../services/statsServices";

@Route("usages")
@Tags("Usages")
export default class UsagesController extends Controller {
  TABLE: string = "usages";

  @Post()
  public async addUsage(
    @Body() usageData: INewUsage,
    res: Response
  ): Promise<void> {
    await incrementOfferRefugeesCount(usageData.offerId);
    if (await isFirstUsageForPerson(usageData.personId)) {
      await incrementStat(StatsType.HELPED_PEOPLE);
    }
    if (await isOfferFilled(usageData.offerId)) {
      await decrementStat(StatsType.ACTIVE_OFFERS);
    }

    return await addNewEntry<INewUsage, INewUsage, IDbNewUsage>(
      this.TABLE,
      usageData,
      validateNewUsage,
      convertNewUsageApiToDb,
      res
    );
  }
}
