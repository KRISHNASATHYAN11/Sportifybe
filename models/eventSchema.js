const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    location:{
        type:String,
        required:true

    },
    turfName:{
        type:String,
        required:true,
    },
    eventDesc: {
      type: String,
      required: true,
    },
    sportType: {
      type: String,
      required: true,
    },
   
    eventDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },

    maxPlayers: {
      type: Number,
      required: true,
    },
    pricePerPerson: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      default: "upcoming",
    },
  },
  { timestamps: true }
);

const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;
