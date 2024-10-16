const weatherCodes = {
  0: "Unknown",
  1000: ["Clear", "./Images/Weather Symbols for Weather Codes/clear_day.svg"],
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

const precipitationCodes = {
  0: "N/A",
  1: "Rain",
  2: "Snow",
  3: "Freezing Rain",
  4: "Ice Pellets",
};

tempRange = [];
hourlyData = {};

// checkbox function
document.getElementById("checkbox").addEventListener("change", function () {
  requiredFields = document
    .getElementById("myForm")
    .querySelectorAll("[required]");

  if (this.checked) {
    // when checked we need to avoid the default behavior of the form
    requiredFields.forEach(function (field) {
      field.removeAttribute("required");
    });
    console.log("removed required");
  } else {
    // when unchecked we need to add the required attribute back
    requiredFields.forEach(function (field) {
      field.setAttribute("required", "required");
    });
    console.log("added required");
  }
});

//clear function
document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("street").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
  tempRange = [];
  hourlyData = {};

  const checkbox = document.getElementById("checkbox");
  if (checkbox.checked) {
    checkbox.checked = false;
    const event = new Event("change");
    checkbox.dispatchEvent(event);
  }
  //   document.getElementById("hidden1").hidden = true;
  //   document.getElementById("hidden2").hidden = true;

  location.reload();
});

//

//submit function
document.getElementById("search").addEventListener("click", function (event) {
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const autoDetect = document.getElementById("checkbox").checked;
  const xhr = new XMLHttpRequest();
  const ip_url = "https://ipinfo.io/?token=b72b65292cdc46";
  const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${street
    .split(" ")
    .join("+")},+${city
    .split(" ")
    .join("+")},+${state}&key=AIzaSyDqXJTP92xb2T3PC2fq0bGCIJmF68Y-vyY`;
  console.log(google_url);

  const tooltip1 = document.getElementById("tooltipText1");
  const tooltip2 = document.getElementById("tooltipText2");
  const tooltip3 = document.getElementById("tooltipText3");

  let lat, lon, location;

  if (autoDetect) {
    fetch(ip_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        lat = data.loc.split(",")[0];
        lon = data.loc.split(",")[1];
        location = data.city + ", " + data.region;
        document.getElementById("location").innerHTML = location;
        console.log(lat, lon, location);

        getCurrentWeather(lat, lon);
        getWeeklyWeather(lat, lon);
        getHourlyWeather(lat, lon);

        document.getElementById("hidden1").hidden = false;
      });
  } else {
    if (street.trim() === "") {
      tooltip1.parentElement.classList.add("show-tooltip"); // Show tooltip if input is empty

      tooltip2.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      tooltip3.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
    } else if (city.trim() === "") {
      tooltip1.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      tooltip2.parentElement.classList.add("show-tooltip"); // Show tooltip if input is empty
      tooltip3.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
    } else if (state.trim() === "") {
      tooltip1.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      tooltip2.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      tooltip3.parentElement.classList.add("show-tooltip"); // Show tooltip if input is empty
    } else {
      tooltip1.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      tooltip2.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      tooltip3.parentElement.classList.remove("show-tooltip"); // Hide tooltip if input has value
      fetch(google_url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          lat = data.results[0].geometry.location.lat;
          lon = data.results[0].geometry.location.lng;
          location = data.results[0].formatted_address;
          document.getElementById("location").innerHTML = location;
          console.log(lat, lon, location);

          getCurrentWeather(lat, lon);
          getWeeklyWeather(lat, lon);
          getHourlyWeather(lat, lon);

          document.getElementById("hidden1").hidden = false;
        });
    }
  }
});

function getCurrentWeather(lat, lon) {
  const xhr2 = new XMLHttpRequest();

  const url2 = `https://csci571-436414.wl.r.appspot.com/current?lat=${lat}&lon=${lon}`;
  xhr2.open("GET", url2, true);
  xhr2.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      const data = response[0].values;

      //update the current card
      document.getElementById("current-img").src =
        weatherCodes[data.weatherCode][1];
      document.getElementById("current-weather").innerHTML =
        weatherCodes[data.weatherCode][0];
      document.getElementById("temperature").innerHTML = data.temperature + "°";
      document.getElementById("humidity-val").innerHTML = data.humidity + "%";
      document.getElementById("pressure-val").innerHTML =
        data.pressureSeaLevel + "inHg";
      document.getElementById("wind-val").innerHTML = data.windSpeed + " mph";
      document.getElementById("visibility-val").innerHTML =
        data.visibility + "mi";
      document.getElementById("cloudCover-val").innerHTML =
        data.cloudCover + " %";
      document.getElementById("UV-val").innerHTML = data.uvIndex;
    }
  };
  xhr2.send();
}

function getWeeklyWeather(lat, lon) {
  const xhr3 = new XMLHttpRequest();
  // http://127.0.0.1:5000/nextweek?lat=34.0522&lon=-118.2437;
  const url3 = `  https://csci571-436414.wl.r.appspot.com/nextweek?lat=${lat}&lon=${lon}`;
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
      tableRowClick(response);
    }
  };

  xhr3.send();
}

function getHourlyWeather(lat, lon) {
  const xhr4 = new XMLHttpRequest();
  console.log("lat: " + lat + " lon: " + lon);
  // http://127.0.0.1:5000/hourly?lat=34.0522&lon=-118.2437;
  const url4 = `https://csci571-436414.wl.r.appspot.com/hourly?lat=${lat}&lon=${lon}`;
  xhr4.open("GET", url4, true);
  console.log("reached here4");
  xhr4.onload = function () {
    if (this.status === 200) {
      console.log("reached here5");
      const response = JSON.parse(this.responseText);
      console.log(response);
      hourlyData = { weatherData: response };
      console.log(hourlyData);
      drawHourlyChart();
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
      style: {
        fontSize: "16px",
      },
    },
    xAxis: {
      type: "datetime",
      accessibility: {
        rangeDescription: "Range: Jan 1st 2017 to Dec 31 2017.",
      },
      style: {
        fontSize: "10px",
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      style: {
        fontSize: "10px",
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: "°F",
      xDateFormat: "%A, %b %e",
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "",
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
        lineColor: "rgba(255, 165, 0, 1)",
        marker: {
          enabled: true,
          fillColor: "rgba(44, 156, 252, 1)",
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> ' +
            "Temperature: <b>{point.low} - {point.high}</b><br/>",
        },
      },
    ],
  });
}

function drawHourlyChart() {
  const weatherData = hourlyData;
  mychart = new Highcharts.Chart("container2", {
    chart: {
      marginBottom: 70,
      marginRight: 40,
      marginTop: 50,
      plotBorderWidth: 1,
      height: 400,
      alignTicks: false,
      scrollablePlotArea: {
        minWidth: 720,
      },
    },

    title: {
      text: "Hourly Weather (For Next 5 Days)",
    },
    xAxis: [
      {
        // Bottom X axis
        type: "datetime",
        tickInterval: 2 * 36e5, // two hours
        minorTickInterval: 36e5, // one hour
        tickLength: 0,
        gridLineWidth: 1,
        gridLineColor: "rgba(128, 128, 128, 0.1)",
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        offset: 28,
        showLastLabel: true,
        labels: {
          format: "{value:%H}",
          x: 6,
        },
        crosshair: true,
      },
      {
        // Top X axis
        linkedTo: 0,
        type: "datetime",
        tickInterval: 24 * 3600 * 1000,
        labels: {
          format:
            '{value:<span style="font-size: 12px; font-weight: ' +
            'bold">%a</span> %b %e}',
          align: "left",
          x: 2,
          y: -3,
        },
        opposite: true,
        tickLength: 20,
        gridLineWidth: 1,
      },
    ],
    yAxis: [
      {
        floor: 0,
        ceiling: 105,
        min: 0,
        max: 105,
        title: {
          text: null,
        },
        // temperature axis
        labels: {
          format: "{value}°",
          style: {
            fontSize: "8px",
          },
          x: -3,
        },
        tickInterval: 7,
        gridLineColor: "rgba(128, 128, 128, 0.1)",
      },
      {
        allowDecimals: false,
        title: {
          // Title on top of axis
          text: "inHg",
          offset: 0,
          align: "high",
          rotation: 0,
          style: {
            fontSize: "10px",
            color: "#E8B058",
          },
          textAlign: "left",
          x: 3,
        },
        labels: {
          enabled: false, // Hide all labels on the second y-axis
        },
        plotLines: [
          {
            color: "#E8B058", // Gold color for the plotline
            width: 0,
            value: 29, // The value where the plotline is drawn (like 29 inHg)
            dashStyle: "Dash", // Dashed line style
            zIndex: 3, // Make sure the line is above the chart series
            label: {
              text: "29", // Label next to the plotline
              align: "right",
              x: 12,
              y: 0,
              style: {
                color: "#E8B058",
                fontSize: "8px",
              },
            },
          },
        ],
        min: 0,
        max: 60,
        gridLineWidth: 0,
        opposite: true,
        showLastLabel: false,
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat:
        "<small>{point.x:%A, %b %e, %H:%M} - " +
        "{point.point.to:%H:%M}</small><br>" +
        "<b>{point.point.symbolName}</b><br>",
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true,
        },
      },
      column: {
        pointPadding: 0,
        borderWidth: 1,
        groupPadding: 0,
        shadow: false,
        zIndex: 1,
      },
      windbarb: {
        dataGrouping: {
          enabled: true,
          groupPixelWidth: 12,
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      text: "Forecast",
      position: {
        x: -35,
      },
    },

    annotations: [{}],
    series: [
      {
        name: "",
        data: weatherData.weatherData.map((item) => [
          item.timeStamp,
          item.values.temperature,
        ]),
        marker: {
          enabled: false,
          hover: {
            enabled: true,
          },
        },
        yAxis: 0,
        color: "#FF3333",
        zIndex: 3,
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span>' +
            " " +
            "Temperature: <b> " +
            "{point,y} mm</b><br/>",
        },
      },

      {
        name: "",
        type: "column",
        data: weatherData.weatherData.map((item) => [
          item.timeStamp,
          item.values.humidity,
        ]),
        marker: { enabled: false, hover: { enabled: true } },
        yAxis: 0,
        color: "rgb(135, 213, 253)",
        zIndex: 1,
        dataLabels: {
          enabled: true, // Enable the data labels
          inside: false, // Display them outside the columns (on top)
          align: "center", // Align the labels in the center of each column
          verticalAlign: "bottom", // Align them at the top of the column
          style: {
            fontSize: "8px", // Font size for the data labels
            color: "#000000", // Text color (black in this case)
            fontWeight: "bold", // Optional: make the text bold
          },
          formatter: function () {
            return Math.round(this.y); // Format the label with a percentage sign
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span>' +
            " " +
            "Humidity: <b> " +
            "{point.y} %</b><br/>",
        },
      },
      {
        name: "",
        data: weatherData.weatherData.map((item) => [
          item.timeStamp,
          item.values.pressureSeaLevel,
        ]),
        marker: {
          enabled: false,
          hover: {
            enabled: true,
          },
        },
        yAxis: 1,
        color: "rgb(234,198,127)",
        zIndex: 2,
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span>' +
            " " +
            "Air pressure: <b> " +
            "{point.y} inHg</b><br/>",
        },
      },
      {
        name: "Wind",
        type: "windbarb", // Define the series as windbarb
        id: "windbarbs", // Give the series an id for easier access
        data: weatherData.weatherData.map((item) => [
          item.timeStamp,
          item.values.windSpeed, // Wind speed
          item.values.windDirection, // Wind direction
        ]),
        color: "rgb(86,82,178)", // Optional: set wind barb color
        lineWidth: 1,
        vectorLength: 8,
        xOffset: -2,
        zIndex: 4, // Keep wind barbs on top
        xAxis: 0, // Use the first x-axis (time)
        yAxis: 0, // Use the first y-axis (temperature/humidity) or a new one
        tooltip: {
          valueSuffix: " mph",
        },
      },
    ],
  });

  const xAxis = mychart.xAxis[0];

  for (
    let pos = xAxis.min, max = xAxis.max, i = 0;
    pos <= max + 36e5;
    pos += 36e5, i += 1
  ) {
    // Get the X position
    const isLast = pos === max + 36e5,
      x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

    // Draw the vertical dividers and ticks
    const isLong =
      this.resolution > 36e5 ? pos % this.resolution === 0 : i % 2 === 0;

    mychart.renderer
      .path([
        "M",
        x,
        mychart.plotTop + mychart.plotHeight + (isLong ? 0 : 27),
        "L",
        x,
        mychart.plotTop + mychart.plotHeight + 20,
        "Z",
      ])
      .attr({
        stroke: mychart.options.chart.plotBorderColor,
        "stroke-width": 1,
      })
      .add();
  }

  // Center items in block
  mychart.get("windbarbs").markerGroup.attr({
    translateX: mychart.get("windbarbs").markerGroup.translateX + 8,
  });
}

const arrow = document.getElementById("arrow");
const toggleArrow = document.getElementById("toggleArrow");
let isTrue = true;
arrow.addEventListener("click", function (e) {
  e.preventDefault();
  if (isTrue) {
    toggleArrow.src = "./Images/point-up-512.png";
    arrow.scrollIntoView({ block: "start" });
  } else {
    toggleArrow.src = "./Images/point-down-512.png";
    arrow.scrollIntoView({ block: "end" });
  }
  isTrue = !isTrue;
});

// arrowUp.addEventListener("click", function (e) {
//   e.preventDefault();
//   arrowDown.scrollIntoView({ behavior: "smooth", block: "end" });
// });
function tableRowClick(data) {
  document.querySelectorAll("tr.clickable").forEach(function (row) {
    row.addEventListener("click", function () {
      document.getElementById("hidden2").hidden = false;
      document.getElementById("hidden1").hidden = true;
      updateDailyDetail(data, row.rowIndex - 1);
      arrow.scrollIntoView({ block: "end" });
    });
  });
}

function updateDailyDetail(data, i) {
  console.log(data[i].values.precipitation);
  document.getElementById("daily-date").innerHTML = data[i].startTime;
  document.getElementById("daily-img").src =
    weatherCodes[data[i].values.weatherCode][1];
  document.getElementById("daily-weather").innerHTML =
    weatherCodes[data[i].values.weatherCode][0];
  document.getElementById("daily-temp").innerHTML =
    data[i].values.temperatureMax +
    "°F/" +
    data[i].values.temperatureMin +
    "°F";
  document.getElementById("daily-humidity").innerHTML =
    data[i].values.humidity + "%";
  document.getElementById("daily-wind-speed").innerHTML =
    data[i].values.windSpeed + " mph";
  document.getElementById("daily-visibility").innerHTML =
    data[i].values.visibility + " mi";
  document.getElementById("daily-prec").innerHTML =
    precipitationCodes[data[i].values.precipitationType];
  document.getElementById("daily-chance").innerHTML =
    data[i].values.precipitationProbability + "%";
  document.getElementById("daily-sunrise").innerHTML =
    data[i].values.sunriseTime + "/" + data[i].values.sunsetTime;
}
