//import { Schema } from "mongoose";
import { ObjectID } from "bson";
export interface IOrder {
  shipping:Shipping;
  payment: Payment;
  products: Products;
  userID: ObjectID;
  sellerID: ObjectID;
  };

  interface Payment {
    method ?:string;
    transaction_id ?:string;
  }

  interface Products {
    quantity ?:number;
    sku ?:string;
    title ?:string;
    unit_cost ?:number;
    currency ?:string;
    product_image ?:string;
  }
 
  interface Shipping {
    customer ?:string;
    address ?:string;
    city ?:string;
    region ?:string;
    state ?:string;
    country ?:string;
    delivery_notes ?:string;
    tracking ?:Tracking;
  }
  interface Tracking {
    company ?:string;
    tracking_number ?:string;
    status?:Status;
    estimated_delivery ?:Date;
  }
  interface Status {
    accepted ?:boolean;
    rejected ?:boolean;
    dispatched ?:boolean;
    delivered ?:boolean;
  }

