const mongoose = require("mongoose");
// mongodb returns promise , here promise are handle with then catch as it is  not a function if function we can use async await
const connectionString = process.env.connectionString;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
