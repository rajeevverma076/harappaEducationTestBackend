import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import "../auth/passportHandler";
//import { JWT_SECRET } from "../util/secrets"

export class AuthController {

  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
  
    passport.authenticate("jwt", function (err, user, info) {
      req.user=info
      //console.log(info)
      if (err) {
        //console.log("err"+err);
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        console.log("user"+user);
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        return next();
      }
    })(req, res, next);
  }

  public authorizeJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, jwtToken) {
      if (err) {
        //console.log("error"+err);
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
       // console.log("user"+user);
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const scope = req.baseUrl.split("/").slice(-1)[0];
        const authScope = jwtToken.scope;
        if (authScope && authScope.indexOf(scope) > -1) {
          return next();
        }
        else {
          //console.log("else");
          return res.status(401).json({ status: "error", code: "unauthorized" });
        }
      }
    })(req, res, next);
  }


  
}

