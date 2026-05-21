const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { timestamps: true ,
  versionKey:false
});

module.exports = mongoose.model("Feedback", feedbackSchema);