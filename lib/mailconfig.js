import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "9071bd001@smtp-brevo.com",
    pass : process.env.SMTPKEYVAL
  },
});

export default transporter;