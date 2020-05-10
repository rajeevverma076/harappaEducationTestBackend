//import { Schema } from "mongoose";
import { ObjectID } from "bson";
export interface IProduct {
  sku: string;
  title:  string;
  description: string;
  manufacture_details:ManufactureDetails;
  quantity: number;
  price: number;
  product_image: string;
  userID: ObjectID;
  is_active: boolean;
  };
  interface ManufactureDetails {
    model_number ?:string;
    release_date ?:Date;
  }