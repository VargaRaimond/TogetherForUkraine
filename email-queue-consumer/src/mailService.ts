import nodemailer from "nodemailer";
import { getMessage } from "./messages";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pw.idp.together.for.ukraine@gmail.com",
    pass: "PW_IDP_PASSWORD_123",
  },
});

export const sendEmail = (emailContact, messageType, messageBody) => {
  const message = getMessage(messageType, emailContact, messageBody);

  transporter.sendMail(message, (err) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(`Error while sending ${messageType} mail: ${err}`);
    } else {
      // tslint:disable-next-line:no-console
      console.log(`${messageType} mail successfully sent to ${emailContact}`);
    }
  });
};
