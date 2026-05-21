const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notification.model")


exports.getNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

  const markAsRead = await Notification.updateMany(
    { user: req.user._id, isRead: false },
    { isRead: true }
  );
  
  res.json({ notifications});
});