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

  transporter.sendMail(message, (err, info) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
    } else {
      // tslint:disable-next-line:no-console
      console.log(info);
    }
  });
};
