require("./db/connection");
const express = require("express");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
