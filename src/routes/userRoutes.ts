import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

class UserRoutes {
    router: Router;
    public userController: UserController = new UserController();
    public authController: AuthController = new AuthController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        // For TEST only ! In production, you should use an Identity Provider !!
        this.router.get("/",this.userController.index)
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.authenticateUser);
        this.router.post("/addProduct",this.authController.authenticateJWT,this.userController.add_product);
        this.router.get("/getProduct",this.userController.get_product);
        this.router.post("/placeOrder",this.authController.authenticateJWT,this.userController.place_order);
        this.router.get("/getOrder",this.authController.authenticateJWT,this.userController.get_order);
        this.router.get("/getRequestOrder",this.authController.authenticateJWT,this.userController.get_request_order);
        this.router.put("/orderAcceptOrReject",this.authController.authenticateJWT,this.userController.order_accept_or_reject);
        
        
    }
}

export default new UserRoutes;
