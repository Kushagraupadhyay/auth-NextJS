import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

// email type for defining the email content whether its verify email or password reset email
export const sendEmail = async({email,emailType,userId}:any) =>{

    try{
        // creating a hashed token
       const hashedToken = await bcryptjs.hash(userId.toString(),10)//In many systems, user IDs are often stored as numbers or special types like MongoDB's ObjectId. However, when you need to use these IDs in contexts that require a string (like when appending to a URL, inserting into a text template, or sending as part of a JSON response), you need to convert them to strings.
       
       if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,
            {
                verifyToken:hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            })
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000 // 1 hour
            })                
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d8269b6ee8bd23",
              pass: "ce9eaca8a153dd"
              // TODO: add credentials to .env file
            }
          });

        const mailOptions = {
            from: 'kushagraupadhyayche@gmail.com',
            to:email,
            subject: emailType === 'VERIFY' ? 'Verify your email ' : 'Reset your password',
            html:  `<p> Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'Verifyemail ' : 'resetpassword'}?token=${hashedToken}"> here < /a > to ${emailType === 'VERIFY' ? "Verify your email":"reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'Verifyemail ' : 'resetpassword'}?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;
       
    }catch(error:any){
        throw new Error(error.message);
    }    
}