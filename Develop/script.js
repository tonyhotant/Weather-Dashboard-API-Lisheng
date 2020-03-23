$(document).ready(function() {
  var apiKey = "b9cd52a37f4e83dc74f86603a4adc81a";

  var date = moment().format("L");

  var locations = [];

  init();

  function init() {
    var history = JSON.parse(localStorage.getItem("history"));
    if (history == null) {
      var history = [
        "Austin",
        "Chicago",
        "New York",
        "Orlando",
        "San Francisco",
        "Seattle",
        "Denver",
        "Atlanta"
      ];
    }
    var locations = history;
    localStorage.setItem("history", JSON.stringify(locations));
    for (i = 0; i < locations.length; i++) {
      $("#city-" + i).text(locations[i]);
    }

    displayData(locations[0]);
  }

  $("#button-view").on("click", function(event) {
    event.preventDefault();
    var city = event.target.innerHTML;
    displayData(city);
  });

  $("#search-btn").on("click", function(event) {
    event.preventDefault();
    var city = $("#user-input").val();
    if (city == "" || locations.includes(city)) {
      return;
    } //need handle when city not found

    var newCity = $("<button>");
    newCity.addClass("list-group-item list-group-item-action").text(city);
    $("#button-view").append(newCity);
    $(".list-group-item")
      .first()
      .remove();
    locations.shift();
    locations.push(city);

    //sth wrong here about locations array
    // local storage issue
    localStorage.setItem("history", JSON.stringify(locations));

    displayData(city);
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
      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

      $("#city").text(response.name + "(" + date + ")");
      $("#icon").attr("src", iconURL);
      $("#temp").text(response.main.temp);
      $("#rh").text(response.main.humidity);
      $("#ws").text(response.wind.speed);
    });

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
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

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
  }
});
