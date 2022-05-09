import { IDbUsage, IUsage } from "./usageModels";

export interface IDbStats {
  id: number;
  active_volunteers: number;
  helped_people: number;
  active_offers: number;
  total_offers: number;
}

export interface IStats {
  id: number;
  activeVolunteers: number;
  helpedPeople: number;
  activeOffers: number;
  totalOffers: number;
}

export const convertStatsDbToApi: (usage: IDbStats) => IStats = (stats) => ({
  id: stats.id,
  activeVolunteers: stats.active_volunteers,
  totalOffers: stats.total_offers,
  activeOffers: stats.active_offers,
  helpedPeople: stats.helped_people,
});
