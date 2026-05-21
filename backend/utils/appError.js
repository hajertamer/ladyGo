class AppError extends Error {
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode > 400 & statusCode < 500? "Not Found" : "Server Error";

        this.isOperational = true; // Bug or Syntax error
        Error.captureStackTrace(this, this.constructor) // Where is the error

    }
}

module.exports = AppError