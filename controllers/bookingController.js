const bookModel = require('../models/bookModel')


exports.bookTurf = async(req,res)=>{
    try {
        let {turfId,turfName, description, timeSlot,sellerMail,turfImage,turfPrice,numberOfPlayers} = req.body
         let buyerMail = req.userEmail
        //  payment gateway


// update mongodb
         let newBooking = new bookModel({turfId,turfName, description, timeSlot,sellerMail,turfImage,turfPrice,numberOfPlayers,buyerMail})

         await newBooking.save()

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong in the server"})
        
    }
}