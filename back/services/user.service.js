const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { pool } = require("../lib/db");

const getUsers = async () => {
  const result = await pool.query(
    'SELECT id, name AS username, email, status, "lastLogin" FROM "User"'
  );
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name AS username, email, password, status FROM "User" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT id, name AS username, email, password, status FROM "User" WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

const getUserByVerifyToken = async (token) => {
  const result = await pool.query(
    'SELECT id, name AS username, email, status FROM "User" WHERE "verifyToken" = $1',
    [token]
  );
  return result.rows[0];
};

const authenticateUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }
  return user;
};

const createUser = async (username, email, password, client = pool) => {
  const existingUser = await getUserByEmail(email);
  const userEmail=email.toLowerCase();
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = crypto.randomUUID();
  const result = await client.query(
    'INSERT INTO "User" (name, email, password, "verifyToken") VALUES ($1, $2, $3, $4) RETURNING id, name AS username, email, status, "verifyToken"',
    [username, userEmail, hashedPassword, verifyToken]
  );
  return result.rows[0];
};

const updateUserStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE "User" SET status = $1 WHERE id = $2 RETURNING id, name AS username, email, status',
    [status, id]
  );
  return result.rows[0];
};

const updateLastLogin = async (id, lastLogin) => {
  await pool.query('UPDATE "User" SET "lastLogin" = $1 WHERE id = $2', [
    lastLogin,
    id,
  ]);
};

const bulkUpdateStatus = async (ids, status) => {
  const result = await pool.query(
    'UPDATE "User" SET status = $1 WHERE id = ANY($2::int[]) RETURNING id, name AS username, email, status',
    [status, ids]
  );
  return result.rows;
};

const bulkDelete = async (ids) => {
  const result = await pool.query(
    'DELETE FROM "User" WHERE id = ANY($1::int[]) RETURNING id',
    [ids]
  );
  return result.rows;
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByVerifyToken,
  createUser,
  authenticateUser,
  updateUserStatus,
  updateLastLogin,
  bulkUpdateStatus,
  bulkDelete,
};
