const eventModel = require("../models/eventSchema");

exports.addEventController = async (req, res) => {
  try {
    let {
      eventName,
      eventDesc,
      sportType,
      turfName,
      location,
      eventDate,
      startTime,
      endTime,
      maxPlayers,
      pricePerPerson,
      status,
    } = req.body;

    let createdBy = req.ownerEmail;
    let image = req.file.filename;
    // console.log(image)

    let existingEvent = await eventModel.findOne({ eventName: eventName });
    if (existingEvent) {
      res.status(409).json({ message: "Event with this title already added." });
    } else {
      // logic to add events

      let newEvent = new eventModel({
        eventName,
        eventDesc,
        sportType,
        location,
        turfName,
        eventDate,
        startTime,
        endTime,
        eventImage: image,
        maxPlayers,
        pricePerPerson,
        status,
        createdBy,
      });

      await newEvent.save();
      res.status(201).json({ message: "Successfully Created", newEvent });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};


exports.getAllEvents = async(req,res)=>{
  try {
    let searchKey = req.query.search
    let searchQuery = {
      location : {
        $regex : searchKey,
        $options : 'i'
      }
    }

    let AllEvents = await eventModel.find(searchQuery)
    res.status(200).json({message:"Events List is here",AllEvents}) 
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong in server"})
    
  }
}


exports.getLimitedEvents = async (req, res) => {
  try {
    let limitedEvents = await eventModel.find().limit(6);
    res
      .status(200)
      .json({ message: "List of Limited Turf are here", limitedEvents});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};


exports.getSingleEvent = async (req, res) => {
  try {
    let { id } = req.params;
    let singleEvent = await eventModel.findById({ _id: id });
    res.status(200).json(singleEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occurred in Server." });
  }
};
