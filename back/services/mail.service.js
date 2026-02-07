const nodemailer = require("nodemailer");

console.log("Mail Initializing SMTP transporter");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Mail SMTP connection failed:", error.message);
  } else {
    console.log("Mail SMTP connection established successfully");
  }
});

const sendVerificationEmail = async (email, token) => {
  console.log(`Mail Preparing verification email for ${email}`);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${process.env.CLIENT_URL}/verify?token=${token}">Verify Email</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Mail] Verification email sent to ${email}, messageId: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Mail] Failed to send verification email to ${email}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};
