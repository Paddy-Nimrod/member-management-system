const express = require("express");

const app = express();

const port = process.env.PORT || 3001;

app.listen(() => {
  console.log(`app running on port ${port}`);
});
