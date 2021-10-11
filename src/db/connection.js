const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connection Successful");
  } catch (err) {
    throw (
      (new Error(`unable to connect to database: ${MONGO_URI}`),
      console.log(err))
    );
  }
};

connection();
