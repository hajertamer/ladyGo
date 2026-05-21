const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken")

const authMiddleware = catchAsync(
    async (req,res,next) => {
        const authHeader = req.headers.authorization;
        if(authHeader){
            const token = req.headers.authorization.split(" ")[1]
            const {_id} = await jwt.verify(token,process.env.SECRET_KEY)
            const user = await User.findById(_id)

            if (!user) {
                return next( new AppError(400, "User not found"));
            }

            req.user = user
            next()
        }else {
            return next( new AppError(400, "Please login first"))
        }
    }

)

module.exports =authMiddleware