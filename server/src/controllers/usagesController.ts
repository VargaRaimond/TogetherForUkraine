import { Controller, Route, Tags, Post, Body } from "tsoa";
import { addNewEntry } from "../db/services";
import { Response } from "express";
import {
  convertNewUsageApiToDb,
  IDbNewUsage,
  INewUsage,
  validateNewUsage,
} from "../models/usageModels";
import { incrementRefugeesCount } from "../services/offersServices";

@Route("usages")
@Tags("Usages")
export default class UsagesController extends Controller {
  TABLE: string = "usages";

  @Post()
  public async addUsage(
    @Body() usageData: INewUsage,
    res: Response
  ): Promise<void> {
    await incrementRefugeesCount(usageData.offerId);
    return await addNewEntry<INewUsage, INewUsage, IDbNewUsage>(
      this.TABLE,
      usageData,
      validateNewUsage,
      convertNewUsageApiToDb,
      res
    );
  }
}
