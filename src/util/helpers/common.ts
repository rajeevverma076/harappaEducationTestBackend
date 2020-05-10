import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../../models/user";
import { ObjectID } from "bson";

class CommonService {
    constructor() { }

    //Generate Unique TransID
    generateTempPassword(howMany: any, chars: any) {
        chars = chars || "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        var rnd = crypto.randomBytes(howMany),
            value = new Array(howMany),
            len = chars.length;
        for (var i = 0; i < howMany; i++) {
            value[i] = chars[rnd[i] % len];
        }
        return value.join("");
    }


  hasHttp(key:string) {
    const regex = /^http/;
    if(regex.test(key)){
      return true;
    }
    return false;
  }
  //END
}


export default new CommonService;