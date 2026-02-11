const bookModel = require("../models/bookModel");
const stripe = require("stripe")(process.env.stripeKey);

exports.bookTurf = async (req, res) => {
  try {
    let {
      turfId,
      turfName,
      description,
      timeSlot,
      sellerMail,
      turfImage,
      turfPrice,
      numberOfPlayers,
    } = req.body;
    let buyerMail = req.userEmail;
    //  payment gateway

    let actualAmount = turfPrice * numberOfPlayers;

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: turfName,
            description: description,
            images: [`http://localhost:3000/uploads/${turfImage}`],
            metadata: {
              turfName,
              sellerMail,
              turfId,
              turfPrice,
              buyerMail,
              numberOfPlayers,
            },
          },
          //   1 dollar - 100 cent
          unit_amount: Math.round(actualAmount * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/bookingsuccess",
      cancel_url: "http://localhost:5173/bookingfailure",
    });

    // update mongodb
    let newBooking = new bookModel({
      turfId,
      turfName,
      description,
      timeSlot,
      sellerMail,
      turfImage,
      turfPrice,
      numberOfPlayers,
      totalAmount: actualAmount,
      buyerMail,
    });

    await newBooking.save();
    res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in the server" });
  }
};
