const userModel = require("../models/userModel");

exports.getAllUsers = async(req,res)=>{
    try {

        let allUsers = await userModel.find({userType:{$ne:'owner'}}).select(-password)
        res.status(200).json(allUsers)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong in server"})
        
    }
}