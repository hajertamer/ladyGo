const mongoose = require("mongoose")
const chalk = require("chalk")

const connectDB = async () => {
    try {
        const connect =await mongoose.connect(process.env.DATABASE_URL)
        console.log(chalk.bgGreen(`Database connected successfully ${connect.connection.name}`));
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDB , chalk