import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const { MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, MAIL_REFRESH_TOKEN, MAIL_SENDER } = process.env;

const sendMail = async ({ typeMail, to, subject, txt, url = "" }) => {
  let contentMail = {};

  switch (typeMail) {
    case "forgotPassword":
      contentMail = {
        subject: "Forgot your Blog account?",
        html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; background-color: #f9f9f9; color: #333;">
                  <h2 style="text-align: center; color: teal;">Mail from AniRealm</h2>
                  <p>This is email about forgot your password! Click the button below to reset your password.</p>
              
                  <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                  <p>If the button don't work for any reason, you can also click on the link below:</p>
                  <div>${url}</div>
                  <hr>
                  <p style="text-align: right; font-size: 90%; color: #888;">Best regards,<br>Admin</p>
                </div>`,
      };
      break;

    case "register":
      contentMail = {
        subject: "Register your Blog account",
        html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; background-color: #f9f9f9; color: #333;">
                  <h2 style="text-align: center; color: teal;">Mail from AniRealm</h2>
                  <p>Congratulation! Just click the button below to validate your email address.</p>
              
                  <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                  <p>If the button don't work for any reason, you can also click on the link below:</p>
                  <div>${url}</div>
                  <hr>
                  <p style="text-align: right; font-size: 90%; color: #888;">Best regards,<br>Admin</p>
                </div>`,
      };
      break;

    case "ban":
      contentMail = {
        subject,
        html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; background-color: #f9f9f9; color: #333;">
              <h2 style="text-align: center; color: teal;">Mail from AniRealm</h2>
              <p>Your account has been banned</p>
              ${txt}
              <hr>
              <p style="text-align: right; font-size: 90%; color: #888;">Best regards,<br>Admin</p>
            </div>`,
      };
      break;

    case "custom":
      contentMail = {
        subject,
        html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; background-color: #f9f9f9; color: #333;">
              <h2 style="text-align: center; color: teal;">Mail from AniRealm</h2>
              <p>This is content from admin</p>
              ${txt}
              <hr>
              <p style="text-align: right; font-size: 90%; color: #888;">Best regards,<br>Admin</p>
            </div>`,
      };
      break;
  }

  const oAuth2Client = new OAuth2Client(MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, OAUTH_PLAYGROUND);

  oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN });

  try {
    const access_token = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_SENDER,
        clientId: MAIL_CLIENT_ID,
        clientSecret: MAIL_CLIENT_SECRET,
        refreshToken: MAIL_REFRESH_TOKEN,
        accessToken: access_token,
      },
    });

    const mailOptions = {
      from: MAIL_SENDER,
      to: to,
      ...contentMail,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err.message;
  }
};

export default sendMail;
