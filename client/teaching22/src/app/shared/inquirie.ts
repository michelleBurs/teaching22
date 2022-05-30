import {Offer} from "./offer";
export {Offer} from "./offer";
import {User} from "./user";
export {User} from "./user";

export class Inquirie {
  constructor(public id: number, public date: Date | undefined, public startTime: Date | undefined,
              public endTime: Date | undefined, public offer_id: number, public user_id: number,
              public status?: number, public text?: string, public offer?: Offer, public user?: User) {
  }
}
