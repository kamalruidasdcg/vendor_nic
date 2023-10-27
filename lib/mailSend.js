require("dotenv").config();
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE_NAME,
  host:  process.env.MAIL_HOST_URL,
  port:  process.env.MAIL_SEND_PORT,
  secure: false,
  ignoreTLS: true,
  auth: {
    user:  process.env.MAIL_SEND_MAIL_ID,
    pass:  process.env.MAIL_SEND_MAIL_PASSWORD,
  },
});

const SENDMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback("mail sent to ->", mailDetails);
  } catch (error) {
    console.log(error);
  }
};

module.exports = SENDMAIL;
