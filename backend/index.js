require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redisClient = require("./utils/redis_client");
const cors = require("cors");
const multer = require("multer");

const userRoutes = require("./routes/user_routes");
const memberRoutes = require("./routes/member_routes");

const app = express();

const port = process.env.PORT || 3001;

let redisSessionStore = new RedisStore({
  client: redisClient,
  prefix: "simple_formation:",
});

app.use(
  session({
    store: redisSessionStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "keyboard cat",
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "http://localhost:5173" }));

app.use(upload.single("profilePicture"));

app.use(userRoutes);
app.use(memberRoutes);

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
