import { pg } from "../db/knex";
import { IDbStats } from "../models/statsModels";

const statsId = 0;

export enum StatsType {
  ACTIVE_VOLUNTEERS = "active_volunteers",
  HELPED_PEOPLE = "helped_people",
  ACTIVE_OFFERS = "active_offers",
  TOTAL_OFFERS = "total_offers",
}

export async function incrementStat(statType: StatsType) {
  await getCurrentStats();
  await pg("stats").where({ id: statsId }).increment(statType);
}

export async function decrementStat(statType: StatsType) {
  await getCurrentStats();
  await pg("stats").where({ id: statsId }).decrement(statType);
}

export async function getCurrentStats(): Promise<IDbStats[]> {
  const currentStats = await pg("stats").select("*").where({ id: statsId });
  if (currentStats.length === 0) {
    return pg("stats").insert({}, [
      "active_volunteers",
      "helped_people",
      "active_offers",
      "total_offers",
    ]);
  } else {
    return currentStats;
  }
}
