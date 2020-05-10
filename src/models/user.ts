import { Document, Schema, Model, model, Error } from "mongoose";
import { ObjectID } from "bson";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";
export interface IUserModel extends IUser,Document 
{
  //addDocument(data:IDocument):IDocumentModel;
}


export const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile_no: String,
  avatar: String,
  is_active:{type: Boolean,default: true},
  otp_code:String,
  last_active:Date,
  password: String,
  token: String,
  /*
  1.Seller 
  2.Customer 
  */
  role: {type: Number,enum: [1,2]}
},{timestamps: true});


userSchema.pre<IUserModel>("save", function save(next) {
  const user = this;
// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();
// generate a salt
bcrypt.genSalt(10, function(err, salt) {
  if (err) return next(err);
  // hash the password using our new salt
  //console.log(user.password)
  bcrypt.hash(user.password, salt, function(err:Error, hash) 
  {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      //console.log(hash)
      user.password = hash;
      next();
  });
});
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);
