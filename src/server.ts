import express, { Request, Response, NextFunction, Router } from "express";
import * as http from "http"
import compression from "compression";
import cors from "cors";
import UserRoutes from "./routes/userRoutes";

import { mongo } from "./util/middleware/connection";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.config();
    this.routes();
    mongo();
    this.errHandler();
    // this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     
  }

  //Routes initialisation
  public routes(): void {
    this.app.use("/api/user", UserRoutes.router);
  }
//Configuration Goes here
  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
  }
//Middleware
  public middleware(): void {
    this.app.use(cors());
  }
//Start Server
  public start(): void {
    const httpServer = http.createServer(this.app);
    //const httpsServer = https.createServer(credentials, app);
    httpServer.listen(this.app.get("port"), () => {
      console.log("API is running at http://localhost:%d",this.app.get("port"));
    });

    // this.app.listen(this.app.get("port"), () => {
    //   console.log("API is running at http://localhost:%d",this.app.get("port"));
    // });
  }

  //Error handler function
  public errHandler(){
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
      //console.log(err);
       res.status(401).json({ status:0, message: err.message});
        //res.send(err.message);
    });
}
}
const server = new Server();
server.start();
