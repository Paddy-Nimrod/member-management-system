const { createClient } = require("redis");


let redisClient;

if (!redisClient) {
  redisClient = createClient({
    url: "redis://localhost:6379",
  });
}

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully!");
  } catch (err) {
    console.error("Failed to connect to Redis", err);
  }
})();

module.exports = redisClient;

