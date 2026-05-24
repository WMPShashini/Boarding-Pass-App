const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// allow all origins
app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.use("/api", require("./routes/ScanRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// VERY IMPORTANT
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});