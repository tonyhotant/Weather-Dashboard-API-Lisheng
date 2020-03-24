$(document).ready(function() {
  var apiKey = "b9cd52a37f4e83dc74f86603a4adc81a";

  var date = moment().format("L");

  var locations = [
    "Austin",
    "Chicago",
    "New York",
    "Orlando",
    "San Francisco",
    "Seattle",
    "Denver",
    "Atlanta"
  ];

  init();

  function init() {
    var history = JSON.parse(localStorage.getItem("history"));
    if (history == null) {
      localStorage.setItem("history", JSON.stringify(locations));
      for (i = 0; i < locations.length; i++) {
        $("#city-" + i).text(locations[i]);
      }
    } //handle first time load page

    locations = history;
    for (i = 0; i < locations.length; i++) {
      $("#city-" + i).text(locations[i]);
    }

    var index = JSON.parse(localStorage.getItem("locationIndex"));
    if (index == -1) {
      index = 0;
      localStorage.setItem("locationIndex", JSON.stringify(index));
    } //read the first city in array as default

    displayData(locations[index]);
  }

  $("#button-view").on("click", function(event) {
    event.preventDefault();
    var city = event.target.innerHTML;
    displayData(city);
  });

  $("#search-btn").on("click", function() {
    var city = $("#user-input").val();
    if (city == "" || locations.includes(city)) {
      return;
    }
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function() {
      var newCity = $("<button>");
      newCity.addClass("list-group-item list-group-item-action").text(city);
      $("#button-view").append(newCity);
      $(".list-group-item")
        .first()
        .remove();
      locations.shift();
      locations.push(city);
      localStorage.setItem("history", JSON.stringify(locations)); //add new city to button, update localstorage

      displayData(city);
    });
  });

  function displayData(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var iconCode = response.weather[0].icon;
      var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
      $("#city").text(response.name + "(" + date + ")");
      $("#icon").attr("src", iconURL);
      $("#temp").text(response.main.temp);
      $("#rh").text(response.main.humidity);
      $("#ws").text(response.wind.speed);

      //display UV Index
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var uvURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        apiKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(response) {
        $("#uv").text(response.value);
        var uvIndex = response.value;
        if (0 < uvIndex && uvIndex < 2) {
          $("#uv").attr("style", "background-color:green");
        } else if (3 < uvIndex && uvIndex < 5) {
          $("#uv").attr("style", "background-color:yellow");
        } else if (6 < uvIndex && uvIndex < 7) {
          $("#uv").attr("style", "background-color:orange");
        } else if (8 < uvIndex && uvIndex < 10) {
          $("#uv").attr("style", "background-color:red");
        } else if (11 < uvIndex) {
          $("#uv").attr("style", "background-color:violet");
        }
      });
    });

    //display 5-days forecast
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey;

    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      for (i = 1; i < 6; i++) {
        var forecastDt = moment()
          .add(i, "days")
          .format()
          .slice(0, 10);
        var index = response.list
          .map(function(e) {
            return e.dt_txt;
          })
          .indexOf(forecastDt + " 09:00:00");
        var iconCode = response.list[index].weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
        $("#date-" + i).text(
          moment()
            .add(i, "days")
            .format("L")
        );
        $("#icon-" + i).attr("src", iconURL);
        $("#temp-" + i).text(response.list[index].main.temp);
        $("#rh-" + i).text(response.list[index].main.humidity);
      }
    });
    var locationIndex = locations.indexOf(city);
    localStorage.setItem("locationIndex", JSON.stringify(locationIndex));
  }
});
