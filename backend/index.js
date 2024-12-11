const express = require("express");
const RedisStore = require("connect-redis").default;
const redisClient = require("./utils/redis_client");
const session = require("express-session");

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

app.use(express.json());

app.listen(() => {
  console.log(`app running on port ${port}`);
});
