import { Document, Schema, Model, model, Error } from "mongoose";
import { IOrder } from "../interfaces/order.interface";

export interface IOrderModel extends IOrder,Document {
  //addOrder(data:IOrder):IOrderModel;
}
export const orderSchema: Schema = new Schema({
  shipping:{
    customer:{type:String},
    address:{type:String},
    city:{type:String},
    region:{type:String},
    state:{type:String},
    country:{type:String},
    delivery_notes:{type:String},
    tracking: {
      company: {type:String},
      tracking_number:{type:String},
      /*
     1. accepted 
     2. rejected
     3. dispatched
       */
      status:{
        accepted: { type: Boolean,default: false},
        rejected: { type: Boolean,default: false},
        dispatched: { type: Boolean,default: false},
        delivered: { type: Boolean,default: false}
      },
     // status: {type: Number,enum: [1,2,3]},
      estimated_delivery:{type:Date}
    }
    },
    payment: {
      method:  { type: String},
      transaction_id: { type: String},
    },
    products:[{
      quantity: {type: Number}, sku:{type: String}, title:{type: String},
      unit_cost: {type: Number},
      currency: {type: String},
      product_image: {type: String},
    }],
  userID:{type: Schema.Types.ObjectId,ref:"User"},
  sellerID:{type: Schema.Types.ObjectId,ref:"User"},
},{
  timestamps: true
});
orderSchema.pre("save", async (next)=>{next()});
export const Order: Model<IOrderModel> = model<IOrderModel>("Order",orderSchema);

