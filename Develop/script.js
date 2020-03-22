$(document).ready(function() {
    $("#button-view").on("click", function (event) {
        event.preventDefault();

        var date = moment().format('L');

        var locations = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"];

        var city = event.target.innerHTML;
        console.log(city);

        var apiKey = "b9cd52a37f4e83dc74f86603a4adc81a";

        var queryURL =
          "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
        
        // add UV index here  
        var queryUV =  
          "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#city").text(response.name + "(" + date + ")" + response.weather[0].icon);
            $("#temp").text(response.main.temp);
            $("#rh").text(response.main.humidity);
            $("#ws").text(response.wind.speed);

        });  
    
    
    
    
    
        });


});