import dotenv from "dotenv";
dotenv.config();
export const MONGODB_URI = () => {
    const configs = {
        dbAccess: process.env.DB_ACCESS || "local",
        user: process.env.DB_USER || "",
        pass: process.env.DB_PASS || "",
        cluster: process.env.DB_CLUSTER || "",
        db: process.env.DB || "nodeType"
    };
   if(configs.dbAccess === "localserver") {
        //console.log("testing server "+configs.dbAccess)
        return `mongodb://localhost:27017/${configs.db}`
    }
    
};

if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
export const JWT_SECRET = process.env.SECRET_KEY;

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
