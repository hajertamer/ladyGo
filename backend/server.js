const setServerPromise = require("node:dns").promises

setServerPromise.setServers(["8.8.4.4","8.8.8.8"])


const chalk = require("chalk");
const app = require("./app.js");
const connectDB = require("./config/connectDB.js");
app.set("query parser", "extended")


const port = process.env.PORT

connectDB()
app.listen(port, () => { 
    console.log(chalk.bgGreen(`Server created successfuly at port ${port}`));
})