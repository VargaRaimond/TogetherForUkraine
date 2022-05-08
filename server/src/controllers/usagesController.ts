import { Controller, Route, Tags, Post, Body } from "tsoa";
import { addNewEntry } from "../db/services";
import { Response } from "express";
import {convertUsageApiToDb, IDbUsage, INewUsage, IUsage, validateNewUsage} from "../models/usageModels";

@Route("usages")
@Tags("Usages")
export default class UsagesController extends Controller {
    TABLE: string = "usages";

    @Post()
    public async addUsage(
        @Body() usageData: INewUsage,
        res: Response
    ): Promise<void> {
        return await addNewEntry<IUsage, INewUsage, IDbUsage>(
            this.TABLE,
            usageData,
            validateNewUsage,
            convertUsageApiToDb,
            res
        );
    }
}
