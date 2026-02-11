const turfModel = require("../models/turfModel");

exports.addTurfController = async (req, res) => {
  try {
    let {
      turfName,
      location,
      description,
      sportsAvailability,
      maxPlayers,
      pricePerHour,
      openingTime,
      closingTime,
      isAvailable,
      imageURL,
      timestamps,
    } = req.body;
    // owneremail should comes from  token from reqheader so not adding it here

    let userEmail = req.userEmail;
    console.log(userEmail);

    console.log(
      turfName,
      location,
      description,
      sportsAvailability,
      maxPlayers,
      pricePerHour,
      openingTime,
      closingTime,
      isAvailable,
      imageURL,
      timestamps
    );
    // console.log(req.files);

    let uploadedImages = req.files.map((eachFile) => eachFile.filename);
    // console.log(uploadedImages);
    // use findOne - get object not array of object
    let existingTurf = await turfModel.findOne({ turfName: turfName });
    if (existingTurf) {
      res.status(409).json({ message: "Turf with this title already added." });
    } else {
      // logic to add turf

      let newTurf = new turfModel({
        turfName,
        location,
        description,
        sportsAvailability,
        maxPlayers,
        pricePerHour,
        openingTime,
        closingTime,
        isAvailable,
        imageURL,
        timestamps,
        uploadedImages,
        userEmail,
      });

      await newTurf.save();
      res.status(201).json({ message: "Successfully Created", newTurf });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.getAllTurfs = async (req, res) => {
  try {

    let searchKey = req.query.search
    let searchQuery = {
      location :{
        // regular expression - to check the pattern did have specific term or not
        $regex : searchKey,
        $options : 'i'
      }
    }
    let AllTurfs = await turfModel.find(searchQuery);
    res.status(200).json({ message: "Turf List is Here", AllTurfs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occurred in  server" });
  }
};

exports.getLimitedTurfs = async (req, res) => {
  try {
    let limitedTurfs = await turfModel.find().limit(8);
    res
      .status(200)
      .json({ message: "List of Limited Turf are here", limitedTurfs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.getSingleTurf = async (req, res) => {
  try {
    let { id } = req.params;
    let singleTurf = await turfModel.findById({ _id: id });
    res.status(200).json(singleTurf);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occurred in Server." });
  }
};
