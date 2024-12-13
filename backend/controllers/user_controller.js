const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis_client = require("../utils/redis_client");

const { User } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "1h";

exports.createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: "staff",
      isActive: true,
    };
    console.log(user);
    User.create(user).then(() => {
      res.status(200).send("User registration successful.");
    });
  } catch (error) {
    res.status(500).send("An error occured. Please try again.");
  }
};

exports.loginUser = async (req, res) => {
  console.log("login invoked");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "Invalid user credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "User credentials do not match." });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    return res.status(200).json({
      message: "Login success",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.log("An error occured during logging in.", error);
    return res.status(500).json({ message: "internal server error" });
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
