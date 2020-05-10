import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
//import passport from "passport";
import "../auth/passportHandler";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";
import { JWT_SECRET } from "../util/secrets";
import CommonService from "../util/helpers/common";
import emailConfig from "../util/helpers/emailConfig";
export class UserController {

  //Generate JWT Token
  public generateToken(user:any) {
    let payload;
      payload={userID:user._id,
        email:user.email,
        role:user.role,
      }
    console.log(payload);
    return jwt.sign(payload,JWT_SECRET, {expiresIn: '10d'});
  }

  public async index(req: Request, res: Response): Promise<void> {
    res.status(200).send({message: 'GET request successfulll!!!!'});
  }

/**
* @api {POST} /user/registerUser
* @apiName Register Module
* @apiGroup Auth
* @apiSuccess {String} code HTTP status code from API.
* @apiSuccess {String} message Message from API.
* @create_at {Date} 09-05-2020
*/
  public async registerUser(req: Request, res: Response): Promise<void>
  {
    try{
      let emailCheck = await User.findOne({email:req.body.email});
      if(emailCheck){
        emailCheck = emailCheck.toObject();
        delete emailCheck.password;
        res.status(401).send({ status:0, message: "Email already exitsing",data:emailCheck});
      }else{
      let user = new User({name:req.body.name,email:req.body.email,
        password:req.body.password,
        role:req.body.role,mobile_no:req.body.mobile_no});
        const result=await user.save()
        user = user.toObject();
        delete user.password;
        res.status(201).send({ status:1,message:"Registration successfully", data: result});
      }
  }catch (e) {
    // send error with next function.
    res.status(401).send({message: e.message});
  }
  }

/**
    * @api {POST} /user/authenticateUser
    * @apiName Login Module
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 09-05-2020
    */
  public  authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("authenticateUser")
    try{
      const email = req.body.email;
      const password=req.body.password;
      const role=req.body.role
      let user:any;
      user = await User.findOne({email:email,role:role,is_active:true})
      if(!user)
      return res.status(401).json({ status:0, message: "email is not exitsing" });
      const matches = await bcrypt.compareSync(password, user.password);
    if (matches) {
      console.log("matches")
       user = user.toObject();
       delete user.password;
       let jwtToken = this.generateToken(user);
      user.token =jwtToken;
      res.status(200).send({ status:1, message:"Login successfully", data: user});
    } else {
      console.log("Invalid password")
      throw new Error('Invalid password')
     // return res.status(401).json({ status:0, message: "Invalid password" });
    }
    }
    catch (err) {
      console.log(err)
      next(err)
    }
  }

  /**
    * @api {POST} /user/addProduct
    * @apiName Add new product
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 09-05-2020
    */
   public  add_product = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userinfo: any = req.user;
        //console.log(userinfo)
        try{
          let product:any;
          product = await Product.findOne({sku:req.body.sku,userID:userinfo.userID})
          if(!product){
            let productNew = new Product({
              sku:req.body.sku,
              title:req.body.title,
              description:req.body.description,
              manufacture_details:req.body.manufacture_details,
              quantity:req.body.quantity,
              price:req.body.price,
              product_image:req.body.product_image,
              userID: userinfo.userID});
              const result=await productNew.save();
              res.status(200).send({ status:1, message:"Product added successfully",data:result});
          }
          else{
            return res.status(401).json({ status:0, message: "Product already exitsing",data:product });
          }
        }
        catch (err) {
          console.log(err)
          next(err)
        }
    } catch (e) {
        // send error with next function.
        res.status(401).send({ message: e.message });
    }
}
  /**
    * @api {POST} /user/getProduct
    * @apiName Product listing
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 09-05-2020
    */

public get_product = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let matches: any;
    matches = await Product.find({});
    if (matches) {
      res
        .status(200)
        .send({status: 1, message: 'Product listing', data: matches});
    } else {
      throw new Error('Record not found');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
    * @api {POST} /user/placeOrder
    * @apiName Order place by user
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 09-05-2020
    */
   public  place_order = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userinfo: any = req.user;
        console.log(userinfo);
        //console.log(req.body.products[0].sku);
        try{
          let order:any;
          order = await Product.findOne({sku:req.body.products[0].sku, quantity: { $gte:req.body.products[0].quantity} })
          console.log(order)
          if(order){
            let newOrder = new Order({
              shipping:req.body.shipping,
              payment:req.body.payment,
              products:req.body.products,
              sellerID:req.body.sellerID,
              userID: userinfo.userID});
              console.log(newOrder)
              const result=await newOrder.save();
              res.status(200).send({ status:1, message:"Your order placed",data:result});
          }
          else{
            return res.status(401).json({ status:0, message: "Out of stock",data:[]});
          }
        }
        catch (err) {
          console.log(err)
          next(err)
        }
    } catch (e) {
        // send error with next function.
        res.status(401).send({ message: e.message });
    }
}


  /**
    * @api {POST} /user/getOrder
    * @apiName Order listing
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 10-05-2020
    */

public get_order = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let matches: any;
    let userinfo: any = req.user;
    console.log(userinfo);
    matches = await Order.find({"userID":userinfo.userID});
    if (matches) {
      res.status(200).send({status: 1, message: 'Order detail', data: matches});
    } else {
      throw new Error('Record not found');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

 /**
    * @api {GET} /user/getRequestOrder
    * @apiName Get requested order listing
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 10-05-2020
    */

   public get_request_order = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let matches: any;
      let userinfo: any = req.user;
      console.log(userinfo);
      matches = await Order.find({"sellerID":userinfo.userID});
      if (matches) {
        res.status(200).send({status: 1, message: 'Order detail', data: matches});
      } else {
        throw new Error('Record not found');
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  
  /**
    * @api {PUT} /user/orderAcceptOrReject
    * @apiName Update order
    * @apiGroup Auth
    * @apiSuccess {String} code HTTP status code from API.
    * @apiSuccess {String} message Message from API.
    * @create_at {Date} 10-05-2020
    */

   public order_accept_or_reject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let matches: any;
      let userinfo: any = req.user;
      console.log(userinfo);
      matches = await Order.find({"sellerID":userinfo.userID,_id:req.body.orderID});
      if (matches) {

        res.status(200).send({status: 1, message: 'Order detail', data: matches});
      } else {
        throw new Error('Record not found');
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  


//End of controller
}