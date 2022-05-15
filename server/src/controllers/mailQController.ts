import { Controller, Route, Tags, Post, Body } from "tsoa";
import { Response } from "express";

import { addEmailToQueue, addOfferActionMail } from "../services/mailQServices";
import {
  IOfferActionMail,
  IOfferActionMailWithoutName,
  MessageType,
} from "../models/mailQModels";
import { getPersonFromId } from "../services/personServices";

@Route("mail-queue")
@Tags("MailQ")
export default class MailQController extends Controller {
  @Post()
  public async addOfferAcceptedMail(
    @Body() mailData: IOfferActionMail,
    res: Response
  ): Promise<void> {
    await addOfferActionMail(mailData, res, MessageType.OFFER_ACCEPTED);
  }

  @Post()
  public async addOfferDeclinedMail(
    @Body() mailData: IOfferActionMail,
    res: Response
  ): Promise<void> {
    await addOfferActionMail(mailData, res, MessageType.OFFER_DECLINED);
  }

  @Post()
  public async addOfferRemovedMail(
    @Body() mailData: IOfferActionMailWithoutName,
    res: Response
  ): Promise<void> {
    const person = await getPersonFromId(mailData.volunteerId);

    const mailDataWithEmail = {
      ...mailData,
      volunteerName: person.name,
      volunteerContactEmail: person.emailContact,
    } as unknown as IOfferActionMail;

    await addOfferActionMail(mailDataWithEmail, res, MessageType.OFFER_REMOVED);
  }

  @Post()
  public async addNewApplicationMail(
    @Body()
    mailData: {
      volunteerId: string;
      refugeeId: string;
      offerTitle: string;
      offerDescription: string;
      isVolunteerAnonymous: boolean;
      preferredContactMethod: string;
    },
    res: Response
  ): Promise<void> {
    const volunteer = await getPersonFromId(mailData.volunteerId);
    const refugee = await getPersonFromId(mailData.refugeeId);

    const volunteerContact =
      mailData.preferredContactMethod === "email"
        ? volunteer.emailContact
        : volunteer.phoneNumber;

    const volunteerMessageBody = {
      refugeeName: refugee.name,
      volunteerName: volunteer.name,
      offerTitle: mailData.offerTitle,
      refugeePhoneNumber: refugee.phoneNumber,
      refugeeEmail: refugee.emailContact,
    };

    const refugeeMessageBody = {
      refugeeName: refugee.name,
      offerTitle: mailData.offerTitle,
      description: mailData.offerDescription,
      volunteerContact: mailData.isVolunteerAnonymous ? "" : volunteerContact,
      isVolunteerAnonymous: mailData.isVolunteerAnonymous,
    };

    const volunteerMessage = {
      emailContact: volunteer.emailContact,
      messageType: MessageType.NEW_APPLICANT_VOLUNTEER,
      ...volunteerMessageBody,
    };
    const refugeeMessage = {
      emailContact: refugee.emailContact,
      messageType: MessageType.NEW_APPLICANT_REFUGEE,
      ...refugeeMessageBody,
    };

    await addEmailToQueue(volunteerMessage, res);
    await addEmailToQueue(refugeeMessage, res);
  }
}
