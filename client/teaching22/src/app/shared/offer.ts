import {Course} from "./course";

export {Course} from "./course";
import {Image} from "./image";

export {Image} from "./image";
import {User} from "./user";

export {User} from "./user";

export class Offer {
  constructor(public id: number, public title: string, public description: string, public date: Date | undefined,
              public startTime: Date | undefined, public endTime: Date | undefined, public course_id: number,
              public user_id: number, public image?: Image, public status?: number, public course?: Course,
              public user?: User) {
  }
}
