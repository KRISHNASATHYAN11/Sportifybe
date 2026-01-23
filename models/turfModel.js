const mongoose = require("mongoose");
const turfSchema = new mongoose.Schema(
  {
    turfName: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    sportsAvailability: {
      type: String,
      required: true,
    },
    maxPlayers: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },

    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    isAvailable : {
      type: String,
      required: true,
    },
    imageURL:{
      type:String,
      required:true,
    },

    uploadedImages: {
      type: Array,
      required: true,
    },
    userEmail: {
      type: String,
      //   Types is a collection of special data types provided by Mongoose.
      ref: "users",
      // It connects turf and owner
      required: true,
    },
  },
  { timestamps: true }
);
// timestamps - to automatically track creation and updation time of documents(automatic tracking )

const turfModel = mongoose.model("turfs", turfSchema);
module.exports = turfModel;
