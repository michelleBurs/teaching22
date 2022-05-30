import {Offer} from "./offer";

export class OfferFactory {
  static empty(): Offer {
    return new Offer(0, '', '', undefined, undefined, undefined,
      0, 0, {id: 1, url: ''}, 0)
  }

  static fromObject(rawOffer: any): Offer {
    return new Offer(
      rawOffer.id,
      rawOffer.title,
      rawOffer.description,
      typeof (rawOffer.date) === 'string' ? new Date(rawOffer.date) : rawOffer.date,
      typeof (rawOffer.startTime) === 'string' ? (rawOffer.startTime) : rawOffer.startTime,
      typeof (rawOffer.endTime) === 'string' ? (rawOffer.endTime) : rawOffer.endTime,
      rawOffer.course_id,
      rawOffer.user_id,
      rawOffer.image,
      rawOffer.status
    );
  }
}
