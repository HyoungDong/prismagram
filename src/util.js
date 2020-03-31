import dotenv from "dotenv";
import path from "path";
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.resolve(__dirname, ".env") })
export const GenerateSecret = () =>{
    const randomNumber = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
}

const sendMail = (email) =>{
    const options ={
        auth:{
            api_key: process.env.Mail_API,
            domain: process.env.Mail_DOMAIN
        }
    }

    const Mailgunner = nodemailer.createTransport(mg(options));
    return Mailgunner.sendMail(email, (err, info) => {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log(`Response: ${info}`)
        }
    });
}

export const sendSecretMail = (address,secret)  =>{
     const email ={
         from:"Dong@prismagram.com",
         to:address,
         subject: "🔒Login Secret for Prismagram 🔒",
         html: `Hello! Your login secret is "<b>${secret}</b>".  <br/>Copy paste on the app/website to log in` 
     }
     return sendMail(email);
}

export const GenerateToken =(id) =>jwt.sign({id},process.env.JWT_SECRET);