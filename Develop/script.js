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


  function init() {
        //check if localstorage is empty
        //get data, append to buttons and display

        //renderBtn()
        //displayDta()
  }


  function renderBtn() {
        //get city name from user input
        //append to button list
        //display the last city data

        //displayData()
  }


    function searchCity() {
      //get user input
      //append to button-view
      //save to localstorage
    }


    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        var city = $("#user-input").val();

        displayData(city);

        var newCity = $("<button>");
        newCity.addClass("list-group-item list-group-item-action");

    })

    
    $("#button-view").on("click", function(event) {
      event.preventDefault();

      var city = event.target.innerHTML;
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
        var iconURL =
          "http://openweathermap.org/img/w/" + iconCode + ".png";

        $("#city").text(response.name + "(" + date + ")");
        $("#icon").attr("src", iconURL);
        $("#temp").text(response.main.temp);
        $("#rh").text(response.main.humidity);
        $("#ws").text(response.wind.speed);

        //add 5-day forecast here

      });
    }









});
