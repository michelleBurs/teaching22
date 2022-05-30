import {Inquirie, Offer, User} from "./inquirie";

export class InquirieFactory {
  static empty(): Inquirie {
    return new Inquirie(0, undefined, undefined, undefined, 0,
      0, 0, '');
  }

  static fromObject(rawInquirie: any): Inquirie {
    return new Inquirie(
      rawInquirie.id,
      typeof (rawInquirie.date) === 'string' ? new Date(rawInquirie.date) : rawInquirie.date,
      typeof (rawInquirie.startTime) === 'string' ? (rawInquirie.startTime) : rawInquirie.startTime,
      typeof (rawInquirie.endTime) === 'string' ? (rawInquirie.endTime) : rawInquirie.endTime,
      rawInquirie.offer_id,
      rawInquirie.user_id,
      rawInquirie.status,
      rawInquirie.text
    );
  }
}
