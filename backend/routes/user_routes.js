const express = require("express");

const userControllers = require("../controllers/user_controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/api/users/register", userControllers.createNewUser);

router.post("/api/users/login", userControllers.loginUser);

router.post("/api/users/logout", auth, userControllers.logoutUser);

module.exports = router;
