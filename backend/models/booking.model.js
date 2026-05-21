const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true
    },

    phone: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: String,
      required: true
    },

    pickupTime: {
      type: String,
      required: true
    },

    from: {
      type: String,
      required: true
    },

    to: {
      type: String,
      required: true
    },

    ticketType: {
      type: String,
      enum: ["standard", "pro"],
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      required: true
    },

    notes: String,

    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "confirmed"
    }
  },
  { timestamps: true ,
    versionKey: false
  }
);

module.exports = mongoose.model("Booking", bookingSchema);