const express = require("express")
require("dotenv").config()
const app = express()
const morgan = require("morgan")
const authRouter = require("./routes/auth.route.js")
const globalErrorHandler = require("./middlewares/globalError.js")
const bookingRoute = require("./routes/booking.route.js");
const profileRoute = require("./routes/profile.route.js")
const notificationRoute = require("./routes/notification.route.js")
const feedbackRoute = require("./routes/feedback.route.js")



app.use(morgan("dev"))
app.use(express.json())
const cors = require("cors");

app.use(cors());

app.get("/", (req , res) => {
    res.status(200).json({
        success: true,
        message: "welcome to LadyGo server"
    })
})

app.use("/auth", authRouter);
app.use("/booking", bookingRoute);
app.use("/user", profileRoute);
app.use("/user", notificationRoute);
app.use("/feedback", feedbackRoute);


app.use(globalErrorHandler)
module.exports = app