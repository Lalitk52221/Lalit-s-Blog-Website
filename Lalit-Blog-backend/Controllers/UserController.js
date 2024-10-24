const User = require("../Models/UserModel");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch {
    res.status(401).json({
      status: "failed",
      msg: err,
    });
  }
};
