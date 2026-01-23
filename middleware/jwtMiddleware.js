const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    // string to array - split
    let token = req.headers.authorization.split(" ")[1];

    if (token) {
      // logic for decoding
      // token to payload(data),send secretkey
      let jwtData = await jwt.verify(token, process.env.jwtSecret);
      if (jwtData) {
        req.userEmail = jwtData.email;
        next();
      } else {
        res.status(400).json({ message: "Invalid Token, Please Login" });
      }

      // console.log(jwtData);
    } else {
      res.status(400).json({ message: "No token Found Please Login" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error Occurred in server while validating token" });
  }
};

module.exports = jwtMiddleware;
