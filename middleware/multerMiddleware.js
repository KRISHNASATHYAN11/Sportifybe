// install multer - npm i multer
const multer = require("multer");
// storage is to tell which place the file should be saved.

const storage = multer.diskStorage({
  // multer have three argument- req,return get file,get callback function
  // call back function  is used to provide operations
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  // custom name to the file
  filename: (req, file, cb) => {
    let date =  Date.now();
    cb(null, `Sportify-${date}-${file.originalname}`);
  },
});

// create a uploads folder

const fileFilter = (req, file, cb) => {
  // file type is called mimetype
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
    // no error - null, success- true
  } else {
    cb(null, false);
    // failure
    // returns boolean - success-true/failure-false
  }
};

// if options place curly bracket
const multerMiddleware = multer({ storage, fileFilter });

// image go to fileFilter - file type check - success true - go to the storage - go to this destination - upload folder

module.exports = multerMiddleware;
