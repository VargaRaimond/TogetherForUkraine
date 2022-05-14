import express from "express";
import { routesHelper } from "./routesHelper";
import { addEmailToQueue } from "../services/mailQServices";

const router = express.Router();
// const controller = new AuthController();

router.post(
  "/",
  routesHelper(async (req, res) => {
    await addEmailToQueue({ msg: "msg", value: true }, res);
  })
);

export enum MessageType {
  OFFER_ACCEPTED = "OFFER_ACCEPTED",
  OFFER_DECLINED = "OFFER_DECLINED",
  OFFER_REMOVED = "OFFER_REMOVED",
  NEW_APPLICANT_VOLUNTEER = "NEW_APPLICANT_VOLUNTEER",
  NEW_APPLICANT_REFUGEE = "NEW_APPLICANT_REFUGEE",
}

router.post(
  "/offer-accepted",
  routesHelper(async (req, res) => {
    const emailContact = req.body.volunteerContactEmail;
    const messageType = MessageType.OFFER_ACCEPTED;

    const messageBody = {
      volunteerName: req.body.volunteerName,
      offerTitle: req.body.offerTitle,
    };

    await addEmailToQueue({ emailContact, messageType, ...messageBody }, res);
  })
);

router.post(
  "/offer-declined",
  routesHelper(async (req, res) => {
    const emailContact = req.body.volunteerContactEmail;
    const messageType = MessageType.OFFER_DECLINED;

    const messageBody = {
      volunteerName: req.body.volunteerName,
      offerTitle: req.body.offerTitle,
    };

    await addEmailToQueue({ emailContact, messageType, ...messageBody }, res);
  })
);

router.post(
  "/offer-removed",
  routesHelper(async (req, res) => {
    const emailContact = req.body.volunteerContactEmail;
    const messageType = MessageType.OFFER_REMOVED;

    const messageBody = {
      volunteerName: req.body.volunteerName,
      offerTitle: req.body.offerTitle,
    };

    await addEmailToQueue({ emailContact, messageType, ...messageBody }, res);
  })
);

router.post(
  "/new-application",
  routesHelper(async (req, res) => {
    const volunteerContactEmail = req.body.volunteerContactEmail;
    const refugeeContactEmail = req.body.volunteerContactEmail;

    const volunteerMessageBody = {
      refugeeName: req.body.refugeeName,
      volunteerName: req.body.volunteerName,
      offerTitle: req.body.offerTitle,
      refugeePhoneNumber: req.body.refugeePhoneNumber,
      refugeeEmail: req.body.refugeeEmail,
    };

    const refugeeMessageBody = {
      refugeeName: req.body.refugeeName,
      offerTitle: req.body.offerTitle,
      description: req.body.description,
      volunteerContact: req.body.volunteerContact,
      isVolunteerAnonymous: req.body.isVolunteerAnonymous,
    };

    const volunteerMessage = {
      emailContact: volunteerContactEmail,
      messageType: MessageType.NEW_APPLICANT_VOLUNTEER,
      ...volunteerMessageBody,
    };
    const refugeeMessage = {
      emailContact: refugeeContactEmail,
      messageType: MessageType.NEW_APPLICANT_REFUGEE,
      ...refugeeMessageBody,
    };

    await addEmailToQueue(volunteerMessage, res);
    await addEmailToQueue(refugeeMessage, res);
  })
);

export default router;
