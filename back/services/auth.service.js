const userService = require("./user.service");
const mailService = require("./mail.service");
const { pool } = require("../lib/db");
const jwt = require("jsonwebtoken");

const register = async (username, email, password) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const user = await userService.createUser(username, email, password, client);
    console.log(`Auth User created (id: ${user.id}), sending verification email to ${user.email}`);
    await mailService.sendVerificationEmail(user.email, user.verifyToken);
    console.log(`Auth Verification email sent successfully for user ${user.id}`);
    await client.query("COMMIT");
    return { user };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Auth Registration rolled back: ${error.message}`);
    throw error;
  } finally {
    client.release();
  }
};

const verify = async (token) => {
  const user = await userService.getUserByVerifyToken(token);
  if (!user) {
    throw new Error("Invalid verification token");
  }
  if (user.status === "active") {
    return user;
  }
  if (user.status === "blocked") {
    throw new Error("User is blocked");
  }
  return await userService.updateUserStatus(user.id, "active");
};

const login = async (email, password) => {
  const user = await userService.authenticateUser(email, password);
  const token = jwt.sign(
    { id: user.id, status: user.status },
    process.env.JWT_SECRET
  );
  await userService.updateUserStatus(user.id, user.status);
  return { user, token };
};

module.exports = {
  register,
  verify,
  login,
};
