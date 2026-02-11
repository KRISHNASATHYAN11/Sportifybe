const EventBookingModel = require("../models/eventBookingModel");
const stripe = require("stripe")(process.env.stripeKey);

exports.bookEvent = async (req, res) => {
  try {
    let {
      eventId,
      eventName,
      eventDate,
      eventTime,
      pricePerPerson,
      numberOfPlayers,
      ownerEmail,
      eventImage,
    } = req.body;

    // logged-in user
    let userId = req.userId;
    let userEmail = req.userEmail;

    // calculate amount
    let totalAmount = pricePerPerson * numberOfPlayers;

    // 🔐 Stripe payment
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: eventName,
            description: `Event on ${eventDate}`,
            images: [
              `http://localhost:3000/uploads/events/${eventImage}`,
            ],
            metadata: {
              eventId,
              userEmail,
              ownerEmail,
              numberOfPlayers,
            },
          },
          unit_amount: Math.round(totalAmount * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/eventbookingsuccess",
      cancel_url: "http://localhost:5173/eventbookingfailure",
    });

    // 🧾 Save booking (demo flow – acceptable)
    const newBooking = new EventBookingModel({
      eventId,
      eventName,
      userId,
      userEmail,
      ownerEmail,
      eventDate,
      eventTime,
      pricePerPerson,
      numberOfPlayers,
      totalAmount,
      bookingStatus: "Booked",
      paymentStatus: "Pending",
    });

    await newBooking.save();

    res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};
