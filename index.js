let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let users = require("./users/index");
require("dotenv").config();

const PORT = process.env.port || 3001;
const URL = process.env.MONGO_URL;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(users);

mongoose.connect(URL, (error) => {
  if (error) return console.log(error + "Unable to connect");
  console.log("Connected to database");
});

app.listen(PORT, () => {
  try {
    console.log(`Listening to port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
