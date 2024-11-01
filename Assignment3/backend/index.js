const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Basic route
app.get("/nextweek", async (req, res) => {
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

app.get("/hourly", async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
