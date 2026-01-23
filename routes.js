const express = require("express");
// import express for routing
const userController = require("./controllers/userController");
const jwtMiddleware = require("./middleware/jwtMiddleware");
const turfController = require("./controllers/turfController");
const multerMiddleware = require("./middleware/multerMiddleware");
const eventController = require("./controllers/eventController")
const bookingController = require('./controllers/bookingController')

// call express router
const router = new express.Router();

router.post("/registerUser", userController.registerUser);

router.post("/loginUser", userController.loginUser);

router.post("/googleAuth", userController.googleLogin);

router.post("/addTurf", jwtMiddleware,multerMiddleware.array('uploadedImages'), turfController.addTurfController);


router.get('/getAllTurfs',jwtMiddleware,turfController.getAllTurfs)

router.get('/getLimitedTurfs',turfController.getLimitedTurfs)
// : - params (pass id in params)
router.get('/:id/getSingleTurf',jwtMiddleware,turfController.getSingleTurf)

router.patch('/:id/updateProfile',jwtMiddleware,multerMiddleware.single('profilePic'),userController.updateProfile)

router.post('/addEvent',jwtMiddleware,multerMiddleware.single('eventImage'),eventController.addEventController)

router.get('/getAllEvents',jwtMiddleware,eventController.getAllEvents)

router.get('/getLimitedEvents',eventController.getLimitedEvents)

router.get('/:id/getSingleEvent',jwtMiddleware,eventController.getSingleEvent)

router.get("/getAllUsers",jwtMiddleware,userController.getAllUsers);

router.put('/:id/follow',jwtMiddleware,userController.followUser)

router.put('/:id/unfollow',jwtMiddleware,userController.unfollowUser)

router.post('/makeBooking',jwtMiddleware,bookingController.bookTurf)


module.exports = router;

// exported routes should be called in server so that api calls to  server get to routes
