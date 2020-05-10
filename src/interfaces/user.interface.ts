//import { Schema } from "mongoose";
import { ObjectID } from "bson";
export interface IUser {
  email:string;
  name:string;
  mobile_no:string;
  avatar: string;
  is_active:boolean;
  otp_code:string;
  last_active:Date;
  password:string;
  token:string;
  role:number;
  };  