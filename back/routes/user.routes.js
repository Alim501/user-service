const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/users", authMiddleware, controller.getUsers);
router.post("/users/block", authMiddleware, controller.blockUsers);
router.post("/users/unblock", authMiddleware, controller.unblockUsers);
router.post("/users/delete", authMiddleware, controller.deleteUsers);
module.exports = router;
