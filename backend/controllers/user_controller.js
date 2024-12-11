const { sequelize } = require("../models");
const { DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis_client = require("../utils/redis_client");

const User = require("../models/user")(sequelize, DataTypes);

exports.createNewUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
};

exports.loginUser = async (req, res) => {
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
