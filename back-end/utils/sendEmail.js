import axios from "axios";

const sendEmail = async (options) => {
  const res = await axios.post(
    `https://api.brevo.com/v3/smtp/email`,
    {
      sender: {
        name: "Clean Games",
        email: process.env.EMAIL,
      },
      to: [
        {
          email: options.email,
        },
      ],
      subject: options.subject,
      textContent: options.message,
    },
    {
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
};

export default sendEmail;
