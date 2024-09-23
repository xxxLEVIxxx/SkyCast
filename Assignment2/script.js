//global variables
const weatherCodes = {
  0: "Unknown",
  1000: [
    "Clear, Sunny",
    "./Images/Weather Symbols for Weather Codes/clear_day.svg",
  ],
  1100: [
    "Mostly Clear",
    "./Images/Weather Symbols for Weather Codes/mostly_clear_day.svg",
  ],
  1101: [
    "Partly Cloudy",
    "./Images/Weather Symbols for Weather Codes/partly_cloudy_day.svg",
  ],
  1102: [
    "Mostly Cloudy",
    "./Images/Weather Symbols for Weather Codes/mostly_cloudy.svg",
  ],
  1001: ["Cloudy", "./Images/Weather Symbols for Weather Codes/cloudy.svg"],
  2000: ["Fog", "./Images/Weather Symbols for Weather Codes/fog.svg"],
  2100: [
    "Light Fog",
    "./Images/Weather Symbols for Weather Codes/fog_light.svg",
  ],
  4000: ["Drizzle", "./Images/Weather Symbols for Weather Codes/drizzle.svg"],
  4001: ["Rain", "./Images/Weather Symbols for Weather Codes/rain.svg"],
  4200: [
    "Light Rain",
    "./Images/Weather Symbols for Weather Codes/rain_light.svg",
  ],
  4201: [
    "Heavy Rain",
    "./Images/Weather Symbols for Weather Codes/rain_heavy.svg",
  ],
  5000: ["Snow", "./Images/Weather Symbols for Weather Codes/snow.svg"],
  5001: ["Flurries", "./Images/Weather Symbols for Weather Codes/flurries.svg"],
  5100: [
    "Light Snow",
    "./Images/Weather Symbols for Weather Codes/snow_light.svg",
  ],
  5101: [
    "Heavy Snow",
    "./Images/Weather Symbols for Weather Codes/snow_heavy.svg",
  ],
  6000: [
    "Freezing Drizzle",
    "./Images/Weather Symbols for Weather Codes/freezing_drizzle.svg",
  ],
  6001: [
    "Freezing Rain",
    "./Images/Weather Symbols for Weather Codes/freezing_rain.svg",
  ],
  6200: [
    "Light Freezing Rain",
    "./Images/Weather Symbols for Weather Codes/freezing_rain_light.svg",
  ],
  6201: [
    "Heavy Freezing Rain",
    "./Images/Weather Symbols for Weather Codes/freezing_rain_heavy.svg",
  ],
  7000: [
    "Ice Pellets",
    "./Images/Weather Symbols for Weather Codes/ice_pellets.svg",
  ],
  7101: [
    "Heavy Ice Pellets",
    "./Images/Weather Symbols for Weather Codes/ice_pellets_heavy.svg",
  ],
  7102: [
    "Light Ice Pellets",
    "./Images/Weather Symbols for Weather Codes/ice_pellets_light.svg",
  ],
  8000: [
    "Thunderstorm",
    "./Images/Weather Symbols for Weather Codes/tstorm.svg",
  ],
};

//clear function
document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("street").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
  document.getElementById("checkbox").checked = false;
});

//submit function
document.getElementById("search").addEventListener("click", function () {
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const autoDetect = document.getElementById("checkbox").checked;
  const xhr = new XMLHttpRequest();
  const ip_url = "https://ipinfo.io/?token=b72b65292cdc46";

  console.log(autoDetect);
  // is auto detect is checked,
  if (autoDetect) {
    var lat = 0;
    var lon = 0;
    xhr.open("GET", ip_url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        console.log(200);
        const response = JSON.parse(this.responseText);
        const location = response.loc.split(",");
        lat = location[0];
        lon = location[1];
      }
    };

    xhr.send();

    console.log("lat: " + lat + " lon: " + lon);
    const xhr2 = new XMLHttpRequest();
    const url = `http://127.0.0.1:5000/current?lat=${lat}&lon=${lon}`;
    xhr2.open("GET", url, true);
    xhr2.onload = function () {
      if (this.status === 200) {
        console.log(200);
        const response = JSON.parse(this.responseText);
        console.log(response);
        const data = response.data.timelines[0].intervals[0].values;
        console.log(data);

        //update the current card
        document.getElementById("current-img").src =
          weatherCodes[data.weatherCode][1];
        document.getElementById("current-weather").innerHTML = weatherCodes[0];
        document.getElementById("temperature").innerHTML =
          data.temperature + "°";
        document.getElementById("humidity-val").innerHTML = data.humidity + "%";
        document.getElementById("pressure-val").innerHTML =
          data.pressureSeaLevel + "inHg";
        document.getElementById("wind-val").innerHTML = data.windSpeed + "mph";
        document.getElementById("visibility-val").innerHTML =
          data.visibility + "mi";
        document.getElementById("cloudCover-val").innerHTML =
          data.cloudCover + "%";
        document.getElementById("UV-val").innerHTML = data.uvIndex;
      }
    };
    xhr2.send();
    console.log("reached here2");

    //update the weekly table
    const xhr3 = new XMLHttpRequest();
    const url3 = `http://127.0.0.1:5000/nextweek?lat=${lat}&lon=${lon}`;
    xhr3.open("GET", url3, true);
    console.log("reached here3");
    xhr3.onload = function () {
      if (this.status === 200) {
        console.log(200);
        const response = JSON.parse(this.responseText);
        console.log(response);
        const data = response.data.timelines[0].intervals;
        console.log(data);

        //update the weekly table
        for (let i = 0; i < 7; i++) {
          console.log(data[i].startTime);
          console.log(`date${i}`);
          console.log(document.getElementById(`date${i}`).innerHTML);
          document.getElementById(`date${i}`).innerHTML = data[i].startTime;
          document.getElementById(`status-img${i}`).src =
            weatherCodes[data[i].values.weatherCode][1];
          document.getElementById(`status-text${i}`).innerHTML =
            weatherCodes[data[i].values.weatherCode][0];
          document.getElementById(`tempHigh${i}`).innerHTML =
            data[i].values.temperatureMax;
          document.getElementById(`tempLow${i}`).innerHTML =
            data[i].values.temperatureMin;
          document.getElementById(`windSpeed${i}`).innerHTML =
            data[i].values.windSpeed;
        }
      }
    };
    xhr3.send();
  }
});
