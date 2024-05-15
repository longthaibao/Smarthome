// requiring database
require("./config/DBconfig");
require("dotenv").config();

// error
const AppError = require("./helpers/appError");
const errorHandler = require("./helpers/errorHandler");
const headers = require("./helpers/headers");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./router/index");
const app = express();
const port = process.env.port;

//config API routes;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// for testing index page
// app.get("/", (req, res) => {
//   res.send(`<h1>Hello!</h1>`);
// });

// node js apperror class (error) extanding
app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(headers);
// using errors handler
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Application is listening at port ${port}`);
});

module.exports = app;
