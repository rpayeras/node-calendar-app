const mongoose = require("mongoose");
const environment = process.env.NODE_ENV || "development";

const dbConnection = async () => {
  try {
    await mongoose.connect(
      environment === "production"
        ? process.env.DB_URL
        : process.env.DB_URL_TEST,
      {}
    );

    console.log("DB Online");
  } catch (err) {
    console.log(err);
    throw new Error("Error on connect to db");
  }
};

module.exports = {
  dbConnection,
};
