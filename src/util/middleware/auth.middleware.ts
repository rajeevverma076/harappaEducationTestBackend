// import jwt from 'jsonwebtoken';
// import { model } from 'mongoose';
// import { Request, Response, NextFunction } from "express";
// import { HTTP401Error } from "../utils/httpErrors";



// export const Authorization = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const token: string = req.header('Authorization') || "";
//     const id: string = await handleToken(token) || "";

//     if (!id) {
//       throw new HTTP401Error("You are not a authorized user");
//     }

//     req.userId = id;
//     req.token = token.split(" ")[1];
//     next();

//   } catch (e) {
//     e = new HTTP401Error(e.message, "You may have not passed the authorization key in header");
//     next(e)
//   }
// }

// const handleToken = async (token: string) => {
//   if (token) {
//     token = token.split(" ")[1];
//     const userData: any = await jwt.verify(token, process.env.SECRET_KEY || "") ;
//     const userDetails: any = userData.user ;
//     if (await model('User').findOne({ _id: userDetails._id, tokens: { $in: [token] } }).countDocuments()) {
//       return userDetails._id;
//     } else {
//       // tslint:disable-next-line: no-string-throw
//       throw "You are not authorized user";
//     }
//   } else {
//     // tslint:disable-next-line: no-string-throw
//     throw "You are not authorized user";
//   }
// }
