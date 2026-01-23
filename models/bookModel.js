const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    turfId: {
      type: String,
      ref: "user",
      required: true,
    },
    turfName: {
      type: String,

      required: true,
    },
    description: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },
    sellerMail: {
      type: String,
      required: true,
    },
    buyerMail: {
      type: String,
      required: true,
    },
    turfImage:{
      type:String,
      required:true,
    },
    turfPrice:{
      type:Number,
      required:true,
    },
    numberOfPlayers:{
      type:Number,
      required:true,

    },
    totalAmount:{
      type:Number,
      required:true,
    },
    status: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "booked",
    },
  },
  { timestamps: true },
);

const bookModel = mongoose.model("bookings", bookSchema);
module.exports = bookModel;
