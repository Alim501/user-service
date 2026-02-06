const service = require("../services/auth.service");
const userService = require("../services/user.service");
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { user } = await service.register(username, email, password);
    res
      .status(201)
      .json({ message: "Verification email sent", id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verify = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await service.verify(token);
    res.json({ message: "Email verified successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await service.login(email, password);
    userService.updateLastLogin(user.id, new Date());
    res.json({ id: user.id, username: user.username, email: user.email, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  register,
  verify,
  login,
};