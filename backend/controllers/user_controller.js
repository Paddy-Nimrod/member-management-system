const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis_client = require("../utils/redis_client");

const { User } = require("../models");

exports.createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: "staff",
    }).then(() => {
      res.status(200).send("User registration successful.");
    });
  } catch (error) {}
};

exports.loginUser = async (req, res) => {
  console.log("login invoked");
  const { email, password } = req.body;

  try {
    const user = User.findOne({ where: { email: email } });
    if (!user) {
      return res.redirect("/user/login");
    }
    const password_match = bcrypt.compare(password, user.password);
    if (password_match) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      res.redirect("/api/v1/list/members");
    } else {
      return res.status(400).send("User credentials do not match.");
    }
  } catch (error) {
    console.log("An error occured during logging in.", error);
    return res.status(500).send("internal server error");
  }
};

exports.logoutUser = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("you could not be logged out.");
      }
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send("An error occured. You could not be logged out.");
  }
};
