const service = require("../services/user.service");

const getUsers = async (_, res) => {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blockUsers = async (req, res) => {
  const { userIds } = req.body;
  try {
    const users = await service.bulkUpdateStatus(userIds, 'blocked');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unblockUsers = async (req, res) => {
  const { userIds } = req.body;
  try {
    const users = await service.bulkUpdateStatus(userIds, 'active');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsers = async (req, res) => {
  const { userIds } = req.body;
  try {
    await service.bulkDelete(userIds);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
};
