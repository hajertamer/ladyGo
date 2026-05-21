const router = require("express").Router();
const { addFeedback, getFeedbacks } = require("../controller/feedback.controller");

router.route("/").post( addFeedback);
router.route("/").get( getFeedbacks);

module.exports = router;