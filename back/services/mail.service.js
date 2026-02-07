const sendVerificationEmail = async (email, token) => {
  console.log(`Mail Preparing verification email for ${email}`);

  const body = {
    sender: { name: "iLearning", email: "alimzhan.mamurbekov@mail.ru" },
    to: [{ email }],
    subject: "Email Verification",
    htmlContent: `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${process.env.CLIENT_URL}/verify?token=${token}">Verify Email</a>
    `,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || JSON.stringify(err));
    }

    const data = await response.json();
    console.log(`[Mail] Verification email sent to ${email}, messageId: ${data.messageId}`);
    return data;
  } catch (error) {
    console.error(`[Mail] Failed to send verification email to ${email}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};
