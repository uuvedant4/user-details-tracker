const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contactNumber: Number,
    hobbies: String,
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetail", UserDetailsSchema);

module.exports = UserDetails;
