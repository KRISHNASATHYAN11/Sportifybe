const mongoose = require("mongoose");

const eventBookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    ownerEmail: {
      type: String,
      required: true,
    },

    eventDate: {
      type: String,
      required: true,
    },

    eventTime: {
      type: String,
      required: true,
    },

    pricePerPerson: {
      type: Number,
      required: true,
    },

    numberOfPlayers: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "Booked",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true },
);
const eventBookingModel = mongoose.model("eventBookings", eventBookingSchema);
module.exports = eventBookingModel;
