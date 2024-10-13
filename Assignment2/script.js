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

tempRange = [];

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
  var lat = 0;
  var lon = 0;

  console.log(autoDetect);
  // is auto detect is checked,
  if (autoDetect) {
    var lat = 0;
    var lon = 0;
    xhr.open("GET", ip_url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        console.log(this.responseText);
        const response = JSON.parse(this.responseText);
        console.log(response);
        const location = response.loc.split(",");
        const location2 = response.city + ", " + response.region;
        document.getElementById("location").innerHTML = location2;
        console.log(location);
        lat = location[0];
        lon = location[1];
        getCurrentWeather(lat, lon);

        getWeeklyWeather(lat, lon);

        getHourlyWeather(lat, lon);
      }
    };

    xhr.send();
  }
});

function getCurrentWeather(lat, lon) {
  const xhr2 = new XMLHttpRequest();
  const url2 = `http://127.0.0.1:5000/current?lat=${lat}&lon=${lon}`;
  xhr2.open("GET", url2, true);
  xhr2.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      const data = response[0].values;

      //update the current card
      document.getElementById("current-img").src =
        weatherCodes[data.weatherCode][1];
      document.getElementById("current-weather").innerHTML = weatherCodes[0];
      document.getElementById("temperature").innerHTML = data.temperature + "°";
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
}

function getWeeklyWeather(lat, lon) {
  const xhr3 = new XMLHttpRequest();
  const url3 = `http://127.0.0.1:5000/nextweek?lat=${lat}&lon=${lon}`;
  xhr3.open("GET", url3, true);
  console.log("reached here3");
  xhr3.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);

      //update the weekly table
      for (let i = 0; i < 6; i++) {
        document.getElementById(`date${i}`).innerHTML = response[i].startTime;
        document.getElementById(`status-img${i}`).src =
          weatherCodes[response[i].values.weatherCode][1];
        document.getElementById(`status-text${i}`).innerHTML =
          weatherCodes[response[i].values.weatherCode][0];
        document.getElementById(`tempHigh${i}`).innerHTML =
          response[i].values.temperatureMax;
        document.getElementById(`tempLow${i}`).innerHTML =
          response[i].values.temperatureMin;
        document.getElementById(`windSpeed${i}`).innerHTML =
          response[i].values.windSpeed;

        tempRange.push([
          response[i].timeStamp,
          response[i].values.temperatureMin,
          response[i].values.temperatureMax,
        ]);
      }
      drawTempRangeChart();
      console.log(tempRange);
    }
  };

  xhr3.send();
}

function getHourlyWeather(lat, lon) {
  const xhr4 = new XMLHttpRequest();
  console.log("lat: " + lat + " lon: " + lon);
  // http://127.0.0.1:5000/hourly?lat=34.0522&lon=-118.2437;
  const url4 = `http://127.0.0.1:5000/hourly?lat=${lat}&lon=${lon}`;
  xhr4.open("GET", url4, true);
  console.log("reached here4");
  xhr4.onload = function () {
    if (this.status === 200) {
      console.log("reached here5");
      const response = JSON.parse(this.responseText);
      console.log(response);
    }
  };
  xhr4.send();
}

function drawTempRangeChart() {
  console.log("reach here 8");
  console.log(tempRange);
  Highcharts.chart("container1", {
    chart: {
      type: "arearange",
      zooming: {
        type: "x",
      },
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "Temperature Range (Min, Max)",
    },
    xAxis: {
      type: "datetime",
      accessibility: {
        rangeDescription: "Range: Jan 1st 2017 to Dec 31 2017.",
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: "°C",
      xDateFormat: "%A, %b %e",
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Temperatures",
        data: tempRange,
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(255, 165, 0, 1)"],
            [1, "rgba(135, 206, 250, 1)"],
          ],
        },
      },
    ],
  });
}
