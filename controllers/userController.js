const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// api calling function  req,res
exports.registerUser = async (req, res) => {
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;
  try {
    if (userName && email && password) {
      // operations

      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        // conflict take place so we use 409 (already existing series code 409)
        res
          .status(409)
          .json({ message: "user with this email id  already exists" });
      } else {
        //  creating  new collection in usermodel
        let newUser = new userModel({ userName, password, email });
        // save is an asynchronous operation so give async await keyword

        await newUser.save();
        // after saving user should know
        res.status(201).json(newUser);
      }
    } else {
      // client error - 400
      res.status(400).json({ message: "Please fill the fields" });
    }
  } catch (error) {
    // server error - 500
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// mongodb associated operation is all asynchronous operation so use async await

exports.loginUser = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (existingUser.password == password) {
        let payload = {
          email: existingUser.email,
          userType: existingUser.userType,
          userName: existingUser.userName,
        };
        let token = await jwt.sign(payload, process.env.jwtSecret);

        res.status(200).json({
          message: "Login Successfull",
          token: token,
          user: existingUser,
        });
      } else {
        // password mismatch 401
        res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      res
        .status(404)
        .json({ message: "There is no user with this email id registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error occurred while login" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { userName, email, profilePic } = req.body;
    // email already existing or not
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // login  logic

      let payload = {
        email: existingUser.email,
        userType: existingUser.userType,
        userName: existingUser.userName,
      };

      let token = jwt.sign(payload, process.env.jwtSecret);

      res.status(200).json({
        message: "Google Login Success",
        token: token,
        user: existingUser,
      });
    } else {
      // if first time
      // register logic

      let newUser = new userModel({
        userName,
        email,
        profilePic,
        password: "google123",
      });
      // dummy password is given by default
      // in  real application we generate random password -

      newUser.save();
      let payload = {
        email: newUser.email,
        userType: newUser.userType,
        userName: newUser.userName,
      };

      let token = jwt.sign(payload, process.env.jwtSecret);
      res
        .status(201)
        .json({ message: " Successfull ", token: token, user: newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occurred in Server." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let { userName, password, location, sport, skillLevel, availability, bio } =
      req.body;
    let image = req.file.filename;
    console.log(image);
    let { id } = req.params;
    let updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        userName,
        password,
        location,
        sport,
        skillLevel,
        availability,
        bio,
        profilePic: image,
      },
      { new: true }
    );
    // return  only latest update thats why using new true
    res.status(200).json({ message: "Successfully Updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModel
      .find({ userType: { $eq: "user" } })
      .select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.followUser = async (req, res) => {
  try {
    // Target user (to be followed)
    const { id } = req.params;

    // Logged-in user ID (from JWT middleware)
    const myId = req._id;

    // ❌ Cannot follow yourself
    if (id === myId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    // Find logged-in user
    const myAccount = await userModel.findById(myId);
    if (!myAccount) {
      return res.status(404).json({
        message: "Logged-in user not found",
      });
    }

    // Find target user
    const targetAccount = await userModel.findById(id);
    if (!targetAccount) {
      return res.status(404).json({
        message: "User to follow not found",
      });
    }

    // ❌ Already following check
    if (myAccount.following.includes(id)) {
      return res.status(400).json({
        message: "You are already following this user",
      });
    }

    // ✅ Add target user to my following list
    await userModel.findByIdAndUpdate(myId, {
      $push: { following: id },
    });

    // ✅ Add me to target user's followers list
    await userModel.findByIdAndUpdate(id, {
      $push: { followers: myId },
    });

    return res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong on the server",
    });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const myId = req._id;

    const myAccount = await userModel.findById(myId);
    if (!myAccount) {
      return res.status(404).json({
        message: "Logged-in user not found",
      });
    }

    // ❌ If not following, cannot unfollow
    if (!myAccount.following.includes(id)) {
      return res.status(400).json({
        message: "You are not following this user",
      });
    }

    // ✅ Remove target user from my following list
    await userModel.findByIdAndUpdate(myId, {
      $pull: { following: id },
    });

    // ✅ Remove me from target user's followers list
    await userModel.findByIdAndUpdate(id, {
      $pull: { followers: myId },
    });

    return res.status(200).json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong on the server",
    });
  }
};
