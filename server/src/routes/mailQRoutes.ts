import express from "express";
import { routesHelper } from "./routesHelper";
import { addEmailToQueue } from "../services/mailQServices";
import MailQController from "../controllers/mailQController";
import {
  IOfferActionMail,
  IOfferActionMailWithoutName,
} from "../models/mailQModels";

const router = express.Router();
const controller = new MailQController();

router.post(
  "/",
  routesHelper(async (req, res) => {
    await addEmailToQueue({ msg: "msg", value: true }, res);
  })
);

router.post(
  "/offer-accepted",
  routesHelper((req, res) =>
    controller.addOfferAcceptedMail(req.body as IOfferActionMail, res)
  )
);

router.post(
  "/offer-declined",
  routesHelper((req, res) =>
    controller.addOfferDeclinedMail(req.body as IOfferActionMail, res)
  )
);

router.post(
  "/offer-removed",
  routesHelper((req, res) =>
    controller.addOfferRemovedMail(req.body as IOfferActionMailWithoutName, res)
  )
);

router.post(
  "/new-application",
  routesHelper(
    (req, res) => controller.addNewApplicationMail(req.body, res) // todo: as....
  )
);

export default router;
