import { Request, Response, NextFunction } from "express";
import { uploadToS3 } from "../services/aws.service";
import { HTTP400Error } from "../helpers/httpErrors";

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {       
    //console.log(req.body.user_id)
        const files:any = req.files;
        //const images: object[] = [];
        // console.log(files)
        // console.log("aws")
        if(req.files){
            if(files.avatar){
                for (const ell of files.avatar) {
                    // console.log(ell.originalname)
                    var dateTime = new Date().getTime();
                    //onst fileName = `treasure/${req.body.user_id}/${dateTime}-${(ell.originalname)}`;
                    const fileName = `profile/${dateTime}-${(ell.originalname)}`;
                    // console.log(fileName)
                    const key = await uploadToS3(fileName, ell.buffer, ell.mimetype);
                   // console.log(key)
                    req.body.avatar = key;
                }
            }
      
            // if(files.treasureavatar){
            //     for (const ell of files.treasureavatar) {
            //         var dateTime = new Date().getTime();
            //         //onst fileName = `treasure/${req.body.user_id}/${dateTime}-${(ell.originalname)}`;
            //         const fileName = `profile/${dateTime}-${(ell.originalname)}`;
            //         const key = await uploadToS3(fileName, ell.buffer, ell.mimetype);
            //         //console.log(key)
            //         req.body.treasureavatar = key;
            //     }
            // }

            // if(files.image){ 
            //     for (const el of files.image) {
            //         var dateTime1 = new Date().getTime();
            //         const fileName = `creation/${req.user.user_id}/${dateTime1}-${(el.originalname)}`;
            //         const key1:string = await uploadToS3(fileName, el.buffer, el.mimetype) as string;
            //         images.push({"photo_name":key1,photoUploadedDate:new Date()}); 
            //         //images.push({"photo_name":key1});
            //     }
            //     console.log(images)
            //     req.body.gallary = images;
            // }
            next();
        }else{
            throw new HTTP400Error("Please add images.","Please add images you want to upload");
        }

    } catch (e) {
        next(e);
    }
}

