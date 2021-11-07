require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");




const userRouter = require("./router/user");



mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(process.env.DB_CONNECTED);
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/user", userRouter);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


module.exports = app;