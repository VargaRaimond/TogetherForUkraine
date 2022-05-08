import express from "express";
import { routesHelper } from "./routesHelper";
import UsagesController from "../controllers/usagesController";
import {INewUsage} from "../models/usageModels";

const router = express.Router();
const controller = new UsagesController();

router.post(
    "/",
    routesHelper((req, res) => controller.addUsage(req.body as INewUsage, res))
);

export default router;