import nodemailer from "nodemailer";
import { setSend } from "../setSend.js";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetCodeEmail = async (email, resetCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Change your password!",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery</title>
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
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        text-align: center;
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
      strong {
        display: inline-block;
        padding: 10px 20px;
        font-size: 24px;
        background: linear-gradient(to right, #6ee7b7, #a4c2f4);
        color: #fff;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #aaa;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <h1>Password Recovery</h1>
        <p>To change your password, use the following code on the main page:</p>
        <p><strong>${resetCode}</strong></p>
        <p>If you did not request this code, please contact one of the administrators.</p>
        <div class="footer">
          <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
      </div>
    </body>
    </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return setSend("Reset code sent successfully");
  } catch (error) {
    console.error(error);
    return setSend("Failed to send reset code");
  }
};


