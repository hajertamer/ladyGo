const { signUp, confirmOTP, login, forgetPassword, resetPassword } = require("../controller/auth.controller")
const router = require("express").Router();



router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/confirmOTP").post(confirmOTP)
router.route("/forgetPassword").post(forgetPassword)
router.route("/reset-password/:token").post(resetPassword)


module.exports = router