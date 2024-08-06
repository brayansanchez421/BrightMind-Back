import nodemailer from "nodemailer";
import { setSend } from "../setSend.js";
import dotenv from "dotenv";
dotenv.config();

export const sendResetEmail = async (email) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password changed succesfully",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
           max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .logo {
            max-width: 100px;
            margin: 0 auto 20px;
          }
          h1 {
            color: #007bff;
            font-size: 24px;
            margin-top: 0;
            font-weight: bold;
          }
          p {
            color: #333;
            line-height: 1.6;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://i.pinimg.com/originals/39/2c/86/392c86f7ba1c2600562cd0f36313fc20.png" alt="Company Logo" class="logo">
          <h1>Password Changed Successfully</h1>
          <p>Your password has been updated successfully.</p>
        </div>
      </body>
      </html>`,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject("Failed to send email notification");
        } else {
          console.log("Email sent: " + info.response);
          resolve("Password reset successfully");
        }
      });
    });
  };