const mongoose = require("mongoose")
const { string, boolean } = require("yup")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "name min char is 3"],
        maxLength: [30, "name max char is 30"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password min char is 3"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    confirmOTP: {
        type: String,
    },
    OTP_Date: {
        type: Date
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Driver", "Passenger"],
        default: "Passenger"
    },
    resetToken: String,
    resetDate: Date
}, {
    timestamps: true,
    versionKey: false
})

const User = mongoose.model("User", userSchema)

module.exports = User