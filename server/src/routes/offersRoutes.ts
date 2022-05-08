import express from "express";
import { routesHelper } from "./routesHelper";
import OffersController from "../controllers/offersController";
import {INewOffer} from "../models/offersModels";

const router = express.Router();
const controller = new OffersController();

router.post(
    "/",
    routesHelper((req, res) => controller.addOffer(req.body as INewOffer, res))
);

router.get(
    "/pending",
    routesHelper((req, _) =>
        controller.getPendingOffers()
    )
);

router.get(
    "/",
    routesHelper((req, _) =>
        controller.getOffers()
    )
);

router.put(
    "/:offerId/accept",
    routesHelper((req, res) => controller.acceptOffer(req.params.offerId, req.body, res))
);

router.delete(
    "/:offerId",
    routesHelper((req, res) => controller.deleteOffer(req.params.offerId, res))
);

export default router;
