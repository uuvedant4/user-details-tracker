const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONOG_CONNECTION_URI)
    .then(() => console.log("Database connection successful."))
    .catch((error) => console.log(error.message));
};

module.exports = connectDB;
