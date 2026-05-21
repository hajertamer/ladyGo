const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },
  carModel: String,
  plateNumber: String,
  color: String,
  type: {
    type: String,
    enum: ["standard", "pro"]
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);