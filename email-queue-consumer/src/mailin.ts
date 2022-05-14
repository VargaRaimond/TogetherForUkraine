import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pw.idp.together.for.ukraine@gmail.com",
    pass: "PW_IDP_PASSWORD_123",
  },
});

const message = {
  from: "pw.idp.together.for.ukraine@gmail.com",
  to: "pw.idp.together.for.ukraine@gmail.com",
  subject: "Test",
  html: "<h1>Hello SMTP Email</h1>",
};

export const sendEmail = () => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
