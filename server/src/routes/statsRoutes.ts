import express from "express";
import { routesHelper } from "./routesHelper";
import StatsController from "../controllers/statsController";

const router = express.Router();
const controller = new StatsController();

router.get(
  "/",
  routesHelper((req, res) => controller.getStats())
);

export default router;
