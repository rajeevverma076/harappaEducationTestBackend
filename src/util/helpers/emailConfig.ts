import nodemailer from "nodemailer";
import { HTTP400Error } from "../helpers/httpErrors";
class EmailConfig{
    emailSend(email: string, subject: string, htmltext:string){
        console.log(email)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'vefipple@gmail.com',
                pass: 'virtual@12345'
            },
            tls: {
             rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: '"EMS" <vefipple@gmail.com',
            to: email,
            subject: subject,
            html:htmltext,
        }
        transporter.sendMail(mailOptions).then(function (res) {
            console.log(res)
            return 1;
        }).catch(function (err) {
            console.log(err)
            throw new HTTP400Error(`check your email id`);
        });
    }
}
export default new EmailConfig()