const mongoose = require("mongoose");


const URL = process.env.DATABASE;

mongoose.connect(URL).then(() => {
    console.log("Connection Successfull")
}).catch((err) => {
    console.log("Error Connecting")
})