const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  sport: {
    type: String,
  },

  skillLevel: {
    type: String,
  },
  availability: {
    type: String,
    default: "morning 6 a.m.",
  },

  bio: {
    type: String,
    default: "Sportify User",
  },
  userType: {
    type: String,
    default: "user",
  },

  profilePic: {
    type: String,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
