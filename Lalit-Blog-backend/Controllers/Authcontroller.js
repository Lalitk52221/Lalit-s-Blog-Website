const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Blog = require("../Models/BlogModel")

exports.signup = async (req, res, next) => {
  const {email, password, confirmpassword} = req.body;
  if(!email || !password || !confirmpassword){
    res.status(400).json({
      status:"failed",
      message:"Please Provide Details"
    })
  }
  const newUser = await User.create(req.body);
  const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_JWT, {
    expiresIn: process.env.TOKEN_EXP,
  });
  res.status(200).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  // 1. check email and password
  const {email,password} = req.body;
  if(!email||!password){
    res.status(400).json({
        status:"fail",
        message:"please provide email and password"
    });
    return;
  }
  // 2 check user exist or password is correct or not
  const user = await User.findOne({email}).select("+password");
  // console.log(user);
  if(!user || !(await user.correctPassword(password,user.password))){
    res.status(400).json({
        status:"fail",
        message:"wrong email and password"
    })
    return;
  }
  // 3. if everything is okay then send token 

  const token = jwt.sign({id:user._id},process.env.TOKEN_JWT,{
    expiresIn:process.env.TOKEN_EXP,
  });
  const name = `${user.firstname} ${user.lastname}`;

  // console.log(token);
  res.status(200).json({
    status:"success",
    token,
    user,
    name
  })
}

exports.createBlog = async(req,res,next)=>{
  const {title, blogtext} = req.body;
  if(!title || !blogtext) {
    res.status(400).json({
      status:"failed",
      message:"Please fill the Input Field First"
    })
  }
  const newBlog = await Blog.create(req.body);
  const token = jwt.sign({ id: newBlog._id }, process.env.TOKEN_JWT, {
    expiresIn: process.env.TOKEN_EXP,
  });
  res.status(200).json({
    status: "success",
    token,
    data: {
      blog: newBlog,
    },
  });
}