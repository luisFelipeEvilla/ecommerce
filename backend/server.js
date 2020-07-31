const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

// loggers
const chalk = require("chalk");
const morgan = require("morgan");

//setup enviroment variables
const config = require("./config");

// database connection
const mongodbUrl = config.MONGODB_URL;
try {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    chalk.green("connection successfully established to the database")
  );
} catch (error) {
  console.log(error);
  process.exit(1);
}

// server setup
const app = express();
app.set("port", config.PORT);
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
if (process.env == "prod") {
  app.use(morgan("common"));
} else {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// routes
if (process.env == "prod") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "build", "index.html"));
  });
}
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// start server
app.listen(app.get("port"), () => {
  console.log(
    `server it's listenning at ${chalk.green(
      "http://localhost:" + app.get("port")
    )}`
  );
});
