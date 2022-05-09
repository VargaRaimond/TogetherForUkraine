import { Controller, Route, Tags, Get } from "tsoa";

import { getCurrentStats } from "../services/statsServices";
import { convertStatsDbToApi, IStats } from "../models/statsModels";

@Route("stats")
@Tags("Stats")
export default class StatsController extends Controller {
  @Get()
  public async getStats(): Promise<IStats> {
    const stats = await getCurrentStats();
    return convertStatsDbToApi(stats.pop());
  }
}
