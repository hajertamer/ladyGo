const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },
  method: {
    type: String,
    enum: ["cash", "card"]
  },
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Payment", paymentSchema);