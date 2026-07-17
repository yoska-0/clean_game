import nodemailer from "nodemailer";

// Create a transporter using SMTP
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Clean Games <${process.env.EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
