const teamModel = require("../models/teamModel");

exports.addTeam = async (req, res) => {
  try {
    const newTeam = new TeamModel({
      teamName,
      sport,
      members: membersArray,
      createdBy: req.userId,
    });
    // array of user IDs member array.

    await newTeam.save();
    res.status(201).json({ message: "Team created successfully", newTeam });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server." });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    if (!teamId || !userId) {
      return res.status(400).json({
        message: "teamId and userId are required",
      });
    }

    const team = await teamModel.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const updatedTeam = await teamModel.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    res.status(200).json({
      message: "Member added successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong on the server",
    });
  }
};

