require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE_NAME,
  host: process.env.MAIL_HOST_URL,
  port: process.env.MAIL_SEND_PORT,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: process.env.MAIL_SEND_MAIL_ID,
    pass: process.env.MAIL_SEND_MAIL_PASSWORD,
  },
});

// const mailDetails = {
//   to: emails[i]["email_to"],
//   from: process.env.MAIL_SEND_MAIL_ID,
//   // cc:  emails[i]["email_cc"],
//   // bcc:  emails[i]["email_bcc"],
//   subject: emails[i]["email_subject"],
//   html: EMAIL_TEMPLAE(emails[i]["email_body"]),

// };

const SENDMAIL = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    // callback("mail sent to ->", mailDetails);
    return info;
  } catch (error) {
    console.error(error.message);
    throw error;
  }

  // return new Promise((resolve, reject) => {
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return reject(error);
  //     }
  //     resolve(info);
  //   });
  // });
};

module.exports = SENDMAIL;
