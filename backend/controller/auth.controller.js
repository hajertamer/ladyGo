const crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const {customAlphabet} = require("nanoid")
const User = require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const sendEmail = require("../utils/sendEmail")

// const  jwtSign = promisify(jwt.sign)

exports.signUp = catchAsync(
    async (req,res,next) => {
        console.log(" SIGNUP START");
        const {email,password} = req.body
        

        //check email
        const findUser = await User.findOne({email})
        console.log("BODY ", req.body);
        
        if(findUser) return next(new AppError(400, "This email is already exist"))

        //hash password
        const hashPassword = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
        console.log("✅ Before create");

        //sendOTP
        const OTP = customAlphabet("0123456789",6)() //call return
        const confirmOTP = await bcrypt.hash(OTP,+process.env.SALT_ROUNDS)
        const OTP_Date = Date.now() + 10 * 60 * 1000
        const user = await User.create({...req.body,password:hashPassword,confirmOTP,OTP_Date})

        console.log("✅ User created");

        console.log("Sending OTP to:", email);
        await sendEmail(email,"Confirm Email","",`<h1>The OTP ${OTP}</h1>`)
        console.log("📤 Sending response");

        res.status(200).json({
            success : true,
            data : user
        })
    }
)

exports.confirmOTP = catchAsync(
    async (req,res,next) => {
        const {email,confirmOTP} = req.body
        //if email exist
        const findUser = await User.findOne({email})
        if(!findUser) return next(new AppError(400, "This email is Not Found"))

        //check if email active
        if(findUser.isConfirmed) return next(new AppError(400, "This email is already active!"))

        //check OTP
        const check = await bcrypt.compare(confirmOTP,findUser.confirmOTP)
        if(!confirmOTP || !check || findUser.OTP_Date < Date.now()) return next(new AppError(400, "Invalid OTP or Expired"))
        findUser.isConfirmed = true
        findUser.confirmOTP = null
        findUser.OTP_Date = null
        
        await findUser.save()
        res.status(200).json({
            success : true,
            message : "Email is confirmed"
        })
    }
)

exports.login = catchAsync(
    async (req,res,next) => {
        const {email,password} = req.body
        
        //check email
        const findUser = await User.findOne({email})
        if(!findUser) return next(new AppError(400, "Invalid Credential"))
        if(!findUser.isConfirmed) return next(new AppError(400, "This email isn't active please confirm"))
        
        const check = await bcrypt.compare(password,findUser.password)
        if(!check) return next(new AppError(400, "Invalid Credential"))
        

        const token = await jwt.sign({_id: findUser._id},process.env.SECRET_KEY,{expiresIn:"7d"})
        res.status(200).json({token})
    }
)

exports.forgetPassword =  catchAsync(
    async (req,res,next) => {
        const {email} =  req.body
        const findUser = await User.findOne({email})
        if(!findUser) return next(new AppError(404, "This user is not found!"))
            
        const resetToken = await crypto.randomBytes(32).toString("hex")
        findUser.resetToken = resetToken
        findUser.resetDate = Date.now() + 10 * 60 * 1000
        await findUser.save()

        const link = `http://127.0.0.1:5500/frontend/reset.html?token=${resetToken}`

        await sendEmail(email,"Reset Password","",`<h3>Click here to reset: <a href="${link}">Reset Password</a></h3>`)
        
        res.status(200).json({
            success : true,
            message : "Link send to email"
        })
    }
)

exports.resetPassword =  catchAsync(
    async (req,res,next) => {
        const {token} = req.params
        const {password} = req.body
        const findUser = await User.findOne({resetToken: token, resetDate: {$gt: Date.now()}})
        if(!findUser) return next(new AppError(400, "The link is expired!"))
        if(password.length < 6) return next(new AppError(400, "Please send valid password!"))
        
        const hashPassword = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
        findUser.password = hashPassword
        findUser.resetToken = null
        findUser.resetDate = null
        await findUser.save()
        
        res.status(200).json({
            success : true,
            message : "Password reset successfully"
        })
    }
)