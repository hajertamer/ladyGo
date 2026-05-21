const Feedback = require("../models/feedback.model");

//  add feedback
exports.addFeedback = async (req, res) => {
  const { name, message, rating } = req.body;

  if (!name || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  const feedback = await Feedback.create({ name, message, rating });

  res.json({
    message: "Feedback added",
    feedback
  });
};

//  get all feedbacks
exports.getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });

  res.json({
    feedbacks
  });
};