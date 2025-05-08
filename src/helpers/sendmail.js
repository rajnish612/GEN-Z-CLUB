import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import User from "@/models/user";

async function sendmail(email) {
  
    console.log(process.env.USER);
    console.log(process.env.APP_PASS);
    const hashedtoken = await bcrypt.hash(email,10)
    let user = await User.findOneAndUpdate({email:email},{$set:{verifytoken: hashedtoken}})
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        
        
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASS,
        },
      });
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: process.env.NEXT_PUBLIC_USER, // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<div style="display: flex; height: 100vh; jutify-content: center; align-items:center;"><a href='${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedtoken}'><button style="background-color: black; height: 50px; width: 100px;">Verify Email</button></a></div>`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
}

export default sendmail