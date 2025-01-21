const nodemailer = require("nodemailer");


// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
//SendMail function
const SendMail = async (mailOptions) => {
  return await transporter.sendMail(mailOptions);
};

module.exports = SendMail;
