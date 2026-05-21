const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      match: /^01[0-9]{9}$/,
      unique : true
    },

    carModel: {
      type: String,
      required: true
    },

    carNumber: {
      type: String,
      required: true,
      unique: true
    },

    carColor: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["standard", "pro"],
      required: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);