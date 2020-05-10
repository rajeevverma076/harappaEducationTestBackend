import { S3 } from "aws-sdk";
import path from "path";
//import { s3Config as config } from "../../config";
import { s3Config as config } from "../secrets";
import { HTTP400Error } from "../helpers/httpErrors";

const s3 = new S3({
  accessKeyId: config.accessId,
  secretAccessKey: config.secretId,
  region: config.region,
  signatureVersion: 'v4'
});

export const getSignedUrl = async (userId: string, folder: string, name: string, ContentType: string) => {
  try {
    const key = `${userId}/${folder}/${new Date().getTime()}${path.extname(name)}`;
    return {
      key,
      url: await s3.getSignedUrl('putObject', {
        Bucket: config.bucket,
        ContentType,
        Key: key,
      })
    }
  } catch (e) {
    return e;
  }
}

export const uploadToS3 = (Key: string, Body: Buffer, ContentType?: string) => {
  const allowFileType = ["image/jpg","image/png","image/jpeg","image/gif"];
  const allowFileExtension = [".png", ".jpeg", ".jpg", ".gif"];
  return new Promise((resolve, reject) => {
    const type: string = ContentType as string;
    if(allowFileType.indexOf(type.toLowerCase())+ 1 <= 0 || allowFileExtension.indexOf(path.extname(Key).toLowerCase())+ 1 <= 0){
      throw new HTTP400Error("The file you have chosen is not image file type. pleas choose one from them. (png, jpg, jpeg and gif).")
    }
    s3.upload({ Bucket: config.bucket, Key, ContentType, Body }, (err) => {
      if (err) {
       // console.log(err)
        reject(err.message);
      }
      resolve(Key);
    });
  });
}

export const copyOneFolderToAnotherFolderS3 = (copysource: string, Key: string) => {
return new Promise((resolve,reject)=>{
    let params = {
      Bucket :config.bucket, /* Another bucket working fine */ 
      CopySource :'/'+config.bucket+'/'+copysource, /* copy origin file path required */
      Key :Key, /* destination file path required */
     // ACL : 'public-read',
    };
    s3.copyObject(params, function(copyErr){
      if (copyErr) {
        reject(copyErr.message);
      }
      else {
        //console.log("success")
       resolve(Key)
      }
      });
  });
}




//   deleteImages: (fileName) => {
//     return new Promise((resolve, reject) => {
//       try {
//         var params = {
//           Bucket: process.env.S3_BUCKET_NAME,
//           Key: fileName
//         };
//         s3.deleteObject(params, function (err, data) {
//           if (err) {
//             throw new Error(err);
//           }
//           resolve("Your image has been successfully deleted");
//         });
//       } catch (err) {
//         reject(err);
//       }
//     });
//   },
// }
