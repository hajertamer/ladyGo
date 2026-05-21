const router = require("express").Router();
const { getNotifications } = require("../controller/notifications.controller");
const authMiddleware = require("../middlewares/auth");

router.route("/notifications").get( authMiddleware, getNotifications);

module.exports = router;