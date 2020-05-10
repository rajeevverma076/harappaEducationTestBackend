import { Document, Schema, Model, model, Error } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

export interface IProductModel extends IProduct,Document {
  addProduct(data:IProduct):IProductModel;
}
export const productSchema: Schema = new Schema({
  sku: { type: String, required: true },
  title:  { type: String, required: true },
  description: { type: String},
  manufacture_details:{ model_number:{ type: String},release_date:{ type: Date, default: Date.now }},
  quantity: { type: Number, required: true },
  price: { type: Number,required: true },
  product_image: { type: String},
  userID:{type: Schema.Types.ObjectId,ref:"User"},
  is_active:{type:Boolean,default: true},
},{
  timestamps: true
});
productSchema.pre("save", async (next)=>{next()});
export const Product: Model<IProductModel> = model<IProductModel>("Product", productSchema);

