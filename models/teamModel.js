const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: String,
  sport: String,

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const teamModel = mongoose.model("teams", teamSchema);
module.exports = teamModel;
// members -array of user IDs
