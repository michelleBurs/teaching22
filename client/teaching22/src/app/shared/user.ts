import {Image} from "./image";

export {Image} from "./image";

export class User {
  constructor(public id: number, public firstName: string, public lastName: string, public phoneNumber: string,
              public email: string, public password: string, public language: string, public role: number,
              public image?: Image, public education?: string) {
  }
}
