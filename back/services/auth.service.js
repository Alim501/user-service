const userService = require("./user.service");
const mailService = require("./mail.service");
const jwt = require("jsonwebtoken");

const register = async (username, email, password) => {
  const user = await userService.createUser(username, email, password);
  console.log(`Auth User created (id: ${user.id}), sending verification email to ${user.email}`);
  mailService.sendVerificationEmail(user.email, user.verifyToken).catch((error) => {
    console.error(`Auth Failed to send verification email for user ${user.id}: ${error.message}`);
  });
  return { user };
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
