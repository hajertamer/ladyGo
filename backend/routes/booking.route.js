
const express = require("express");
const { createBooking } = require("../controller/booking.controller");
const authMiddleware = require("../middlewares/auth")


const router = express.Router();

router.route("/").post(authMiddleware, createBooking);

module.exports = router;