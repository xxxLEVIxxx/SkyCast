const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist/assignment3-copy/browser/")));

// All routes will be handled by index.html
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/assignment3-copy/browser", "index.html")
  );
});

app.get("/api/auto", async (req, res) => {
  const input = req.query.input;
  let url =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
    input +
    "&types=(cities)&key=AIzaSyDqXJTP92xb2T3PC2fq0bGCIJmF68Y-vyY";
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch {
    console.error("Error in fetching data from Google API");
    res.status(500).send("Internal Server Error");
  }
});

// Basic route
app.get("/api/nextweek", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  let url =
    "https://api.tomorrow.io/v4/timelines?location=" +
    lat +
    "%2C" +
    lon +
    "&fields=temperatureMax&fields=temperatureMin&fields=weatherCode&fields=windSpeed&fields=sunsetTime&fields=sunriseTime&fields=humidity&fields=visibility&fields=cloudCover&fields=temperatureApparent&units=imperial&timesteps=1d&startTime=now&endTime=nowPlus5d&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp";

  try {
    const response = await axios.get(url);
    let intervals = response.data.data.timelines[0].intervals;
    for (const interval of intervals) {
      interval.startTime = new Date(interval.startTime).toLocaleDateString(
        "en-US",
        { weekday: "long", month: "short", day: "numeric", year: "numeric" }
      );
      interval.values.sunriseTime = new Date(
        interval.values.sunriseTime
      ).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
      interval.values.sunsetTime = new Date(
        interval.values.sunsetTime
      ).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
    }
    res.send(intervals);
  } catch {
    console.error("Error in fetching data from Tomorrow API");
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/hourly", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  let url =
    "https://api.tomorrow.io/v4/timelines?location=" +
    lat +
    "%2C" +
    lon +
    "&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=windDirection&fields=temperature&units=imperial&timesteps=1h&startTime=now&endTime=nowPlus5d&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp";

  try {
    const response = await axios.get(url);
    let intervals = response.data.data.timelines[0].intervals;
    res.send(intervals);
  } catch {
    console.error("Error in fetching data from Tomorrow API");
    res.status(500).send("Internal Server Error");
  }
});

const uri =
  "mongodb+srv://chenghaox123:Xch892623089@cluster0.ruygh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error in connecting to MongoDB", error));

const dataSchema = new mongoose.Schema({
  city: String,
  state: String,
  address: String,
});

const Favorite = mongoose.model("Favorite", dataSchema);

app.get("/api/data", async (req, res) => {
  try {
    const newData = await Favorite.find();
    res.json(newData);
  } catch {
    console.error("Error in fetching data from MongoDB");
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const newData = new Favorite({
      city: req.body.city,
      state: req.body.state,
      address: req.body.address,
    });
    await newData.save();
    res.send(newData);
  } catch (error) {
    console.error("Error in saving data to MongoDB", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/data/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deletedData = await Favorite.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
