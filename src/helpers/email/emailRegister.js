import nodemailer from "nodemailer";
import User from "../../models/user/user.model.js";

import { setSend } from "../setSend.js";


export const sendRegistrationEmail = async (email, name, userSaved) => {
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
      subject: "Account Activation",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Activation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
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
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
          }
          .logo {
            max-width: 120px;
            display: block;
            margin: 0 auto;
          }
          h1 {
            color: #007bff; /* Blue for the title */
            font-size: 24px;
            margin-top: 0;
            font-weight: bold;
          }
          p {
            color: #555;
            line-height: 1.6;
            margin: 10px 0;
          }
          a.btn {
            display: inline-block;
            width: 200px;
            padding: 10px;
            text-align: center;
            background: linear-gradient(to right, #6ee7b7, #a4c2f4);
            color: #007bff; /* Black text color for the button */
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin: 20px auto;
            text-transform: uppercase;
            font-weight: bold;
          }
          a.btn:hover {
            background: linear-gradient(to right, #a4c2f4, #6ee7b7);
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #aaa;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://i.pinimg.com/originals/39/2c/86/392c86f7ba1c2600562cd0f36313fc20.png" alt="Company Logo" class="logo">
          <h1>Congratulations! You have been registered successfully</h1>
          <p>Hello ${name},</p>
          <p>We are delighted to have you with us. Please activate your account by clicking the link below:</p>
          <p><a href="https://plataformbrightmind.netlify.app/PE/activation/${userSaved._id}" class="btn">Activate Account</a></p>
          <div class="footer">
            <p>If you did not request this activation, please ignore this email.</p>
          </div>
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
          resolve("Registration email sent successfully");
        }
      });
    });
  };

  export const sendDeleteUserEmail = async (email) => {
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
      subject: "User Deleted ",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Successfully Deleted</title>
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
          strong {
            color: #007bff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://i.pinimg.com/originals/39/2c/86/392c86f7ba1c2600562cd0f36313fc20.png" alt="Company Logo" class="logo">
          <h1>Your account has been successfully deleted</h1>
          <p>See you soon.</p>
          <p>If you need help, please contact one of the administrators.</p>
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
          resolve("Delete user email sent successfully");
        }
      });
    });
  };

  export const sendDeleteAccountConfirmationEmail = async (email, confirmationCode) => {
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
        subject: "Confirmation Code for Account Deletion",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation Code for Account Deletion</title>
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
            h1 {
              color: #007bff;
              font-size: 24px;
              margin-top: 0;
              font-weight: bold;
            }
            p {
              color: #555;
              line-height: 1.6;
              margin: 10px 0;
            }
            strong {
              display: inline-block;
              padding: 10px 20px;
              font-size: 24px;
              background: linear-gradient(to right, #6ee7b7, #a4c2f4);
              color: #007bff;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
              color: #aaa;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Confirmation Code for Account Deletion</h1>
            <p>To delete your account, use the following confirmation code:</p>
            <p><strong>${confirmationCode}</strong></p>
            <div class="footer">
              <p>If you did not request this deletion, please contact one of the administrators.<br>If you have any questions, feel free to contact our support team.</p>
            </div>
          </div>
        </body>
        </html>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return setSend("Confirmation code email sent successfully");
    } catch (error) {
        console.error(error);
        return setSend("Failed to send confirmation code email");
    }
};
export const sendRegistrationEmailWithTemporaryPassword = async (email, username, temporaryPassword) => {
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
    subject: "Account activation",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Activation</title>
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
        strong {
          color: #007bff;
          display: block;
          margin: 10px 0;
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://i.pinimg.com/originals/39/2c/86/392c86f7ba1c2600562cd0f36313fc20.png" alt="Company Logo" class="logo">
        <h1>Welcome, ${username}!</h1>
        <p>Your account has been created successfully. Please use the following temporary password to login:</p>
        <p><strong>${temporaryPassword}</strong></p>
        <p>Remember, this is a temporary password. For your security, please change it after logging in.</p>
      </div>
    </body>
    </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return setSend("Registration email with temporary password sent successfully");
  } catch (error) {
    console.error(error);
    return setSend("Failed to send registration email with temporary password");
  }
};


