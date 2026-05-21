
const router = require("express").Router();
const { myProfile } = require("../controller/myProfile.controller");
const authMiddleware = require("../middlewares/auth");

router.route("/profile").get(authMiddleware, myProfile);

module.exports = router;