const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, token) => {
  console.log(`Mail Preparing verification email for ${email}`);

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Email Verification",
      html: `
        <h2>Verify your email</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${process.env.CLIENT_URL}/verify?token=${token}">Verify Email</a>
      `,
    });

    if (error) {
      console.error(`[Mail] Failed to send verification email to ${email}:`, error.message);
      throw new Error(error.message);
    }

    console.log(`[Mail] Verification email sent to ${email}, id: ${data.id}`);
    return data;
  } catch (error) {
    console.error(`[Mail] Failed to send verification email to ${email}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};
