const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:[true,"Enter Name"],
    minlength:3
  },
  lastname:{
    type:String,
    required:[true,"Enter Name"],
    minlength:3
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Enter email id"],
    lowercase: [true],
    validate: [validator.isEmail, "Enter Correct Email"],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
    minlength: 4,
  },
  confirmpassword: {
    type: String,
    required: [true, "Enter Confirm Password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "enter correct password",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
});
userSchema.methods.correctPassword = async function (
  candidatepassword,
  userpassword
) {
    return await bcrypt.compare(candidatepassword,userpassword)
};

const user = mongoose.model("User", userSchema);

module.exports = user;
