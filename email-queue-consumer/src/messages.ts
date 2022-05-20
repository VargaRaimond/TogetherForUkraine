const offerAcceptedMessage = (
  volunteerEmail,
  { volunteerName, offerTitle }
) => ({
  from: `pw.idp.together.for.ukraine@gmail.com`,
  to: volunteerEmail,
  subject: `[Together for Ukraine] Offer Accepted`,
  html:
    `<h3>Congrats! Your offer has just been approved.</h3><br/>` +
    `<p>Hello ${volunteerName}</p><br/>` +
    `<p> Thank you for offering your help. We're happy to announce you that your offer has just been approved. The title of the accepted offer is ${offerTitle}.</p><br/>` +
    `<p> Have an amazing day,</p>` +
    `<p> Together for Ukraine team</p>`,
});

const offerDeclinedMessage = (
  volunteerEmail,
  { volunteerName, offerTitle }
) => ({
  from: `pw.idp.together.for.ukraine@gmail.com`,
  to: volunteerEmail,
  subject: `[Together for Ukraine] Offer Declined`,
  html:
    `<h3>Your offer has just been declined.</h3><br/>\n` +
    `<p>Hello ${volunteerName}</p><br/>` +
    `<p> Thank you for offering your help. Unfortunately, we decided not to move forward with your offer. The title of the declined offer is ${offerTitle}.</p><br/>` +
    `<p> Have an amazing day,</p>` +
    `<p> Together for Ukraine team</p>`,
});

const offerDeletedMessage = (
  volunteerEmail,
  { volunteerName, offerTitle }
) => ({
  from: `pw.idp.together.for.ukraine@gmail.com`,
  to: volunteerEmail,
  subject: `[Together for Ukraine] Offer Removed`,
  html:
    `<h3>Your offer has just been removed.</h3><br/>` +
    `<p>Hello ${volunteerName}</p><br/>` +
    `<p> Thank you for offering your help. Unfortunately, we decided to remove your offer. The title of the removed offer is ${offerTitle}.</p><br/>` +
    `<p> Have an amazing day,</p>` +
    `<p> Together for Ukraine team</p>`,
});

const newApplicationVolunteerMessage = (
  volunteerEmail,
  { refugeeName, volunteerName, offerTitle, refugeePhoneNumber, refugeeEmail }
) => ({
  from: `pw.idp.together.for.ukraine@gmail.com`,
  to: volunteerEmail,
  subject: `[Together for Ukraine] New applicant`,
  html:
    `<h3>Congratulations! You have another applicant.</h3><br/>\n` +
    `<p>Hello ${volunteerName}</p><br/>` +
    `<p> A refugee has just applied for your offer. This offer's title is: ${offerTitle}. Below are the necessary info to get in touch with the applicant.</p>` +
    `<b><p>Name: ${refugeeName}</p>` +
    `<p>Phone number: ${refugeePhoneNumber}</p>` +
    `<p>Email: ${refugeeEmail}</p></b><br/>` +
    `<p> Have an amazing day,</p>` +
    `<p> Together for Ukraine team</p>`,
});

const newApplicationRefugeeMessage = (
  refugeeMail,
  {
    refugeeName,
    offerTitle,
    description,
    volunteerContact,
    isVolunteerAnonymous,
  }
) => ({
  from: `pw.idp.together.for.ukraine@gmail.com`,
  to: refugeeMail,
  subject: `[Together for Ukraine] Offer details`,
  html:
    `<h3>Congratulations! You successfully applied for a new offer.</h3><br/>\n` +
    `<p>Hello ${refugeeName}</p><br/>` +
    `<p> Thank you for letting us help you. Your application was successful. Here are the offer's details:</p>` +
    `<b><p>Title: ${offerTitle}</p>` +
    `<p>Description: ${description}</p></b>` +
    (isVolunteerAnonymous ? `` : `<b><p>Contact: ${volunteerContact}</p></b>`) +
    `<p>You will be contacted soon.</p><br/>` +
    `<p> Have an amazing day,</p>` +
    `<p> Together for Ukraine team</p>`,
});

export enum MessageType {
  OFFER_ACCEPTED = "OFFER_ACCEPTED",
  OFFER_DECLINED = "OFFER_DECLINED",
  OFFER_REMOVED = "OFFER_REMOVED",
  NEW_APPLICANT_VOLUNTEER = "NEW_APPLICANT_VOLUNTEER",
  NEW_APPLICANT_REFUGEE = "NEW_APPLICANT_REFUGEE",
}

export const getMessage = (
  messageType: MessageType,
  to: string,
  htmlBody: any
) => {
  switch (messageType) {
    case MessageType.OFFER_ACCEPTED:
      return offerAcceptedMessage(to, htmlBody);
    case MessageType.OFFER_DECLINED:
      return offerDeclinedMessage(to, htmlBody);
    case MessageType.OFFER_REMOVED:
      return offerDeletedMessage(to, htmlBody);
    case MessageType.NEW_APPLICANT_VOLUNTEER:
      return newApplicationVolunteerMessage(to, htmlBody);
    case MessageType.NEW_APPLICANT_REFUGEE:
      return newApplicationRefugeeMessage(to, htmlBody);
  }
};
