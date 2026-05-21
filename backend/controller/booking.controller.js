const Booking = require("../models/booking.model");
const Driver = require("../models/driver.model");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notification.model");

exports.createBooking = catchAsync(async (req, res, next) => {


  const {
    driver,
    phone,
    pickupDate,
    pickupTime,
    from,
    to,
    ticketType,
    paymentMethod,
    notes
  } = req.body;


  // get user from token
  const user = await User.findById(req.user._id);

  //  get driver data
  const driverData = await Driver.findById(driver);
  if (!driverData) return next(new AppError(404, "Driver not found"));

  //  create booking
  const booking = await Booking.create({
    user: req.user._id,
    driver: req.body.driver,
    phone: req.body.phone,
    pickupDate: req.body.pickupDate,
    pickupTime: req.body.pickupTime,
    from: req.body.from,
    to: req.body.to,
    ticketType: req.body.ticketType,
    paymentMethod: req.body.paymentMethod,
    notes: req.body.notes
  });

  console.log("BOOKING BODY:", req.body);
console.log("USER:", req.user);

  //Notification
  
  await Notification.create({
    user: req.user._id,
    message:  `
      <div class="notif-card">
        <p><strong>👋 Hello ${req.user.name}</strong></p>
  
        <p>🚗 <b>${driverData.name}</b> accepted your ride</p>
  
        <hr/>
  
        <p> Driver: ${driverData.name}</p>
        <p> Car: ${driverData.carModel}</p>
        <p> Number: ${driverData.carNumber}</p>
        <p> Color: ${driverData.carColor}</p>
  
        <hr/>
  
        <p> From: ${from}</p>
        <p> To: ${to}</p>
        <p> Time: ${pickupDate} - ${pickupTime}</p>
  
        <p style="margin-top:10px;">🚀 Enjoy your ride</p>
      </div>

  `
  });

   console.log(req.user)
  //  send email
  await sendEmail({
    to: req.user.email,
    subject: "Booking Confirmed 🚗",
    message: `
Hello ${req.user.name},

Your trip is confirmed ✅

Driver: ${driverData.name}
Car: ${driverData.carModel}
Number: ${driverData.carNumber}
Color: ${driverData.carColor}

From: ${from}
To: ${to}
Time: ${pickupDate} - ${pickupTime}

Enjoy your ride 🚀
    `
  });

  

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: booking
  });

});