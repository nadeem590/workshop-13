const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await userModel.findOne({ username }); //findOne({ username });
    if (!user) {
      throw new Error("Unable to Login");
    }
    console.log(user);
    return user;
  };
  
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},"hello")
    await user.save();
    return token;
  };
  
  const userModel = mongoose.model("userModel", userSchema);
  
  module.exports = userModel;
  