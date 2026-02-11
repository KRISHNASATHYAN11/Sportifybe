const jwt = require("jsonwebtoken");

const jwtOwnerMiddleware = async (req, res, next) => {
  try {
    // string to array - split
    let token = req.headers.authorization.split(" ")[1];

    if (token) {
      // logic for decoding
      // token to payload(data),send secretkey
      let jwtData = await jwt.verify(token, process.env.jwtSecret);
      if (jwtData) {
       if(jwtData.userType == 'owner'){
         req.userEmail = jwtData.email;
        next();
       }
      } else {
        res.status(401).json({ message: "This Operation can only be done by Owner Users." });
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

module.exports = jwtOwnerMiddleware;
