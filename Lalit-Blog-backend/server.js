const mongoose = require("mongoose")
const app = require("./app")
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB Connected")
})
PORT_NO = process.env.PORT_NO;
app.listen(PORT_NO,()=>{
    console.log("Successfully Created on - ",PORT_NO," port Number")
})