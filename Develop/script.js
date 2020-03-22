$(document).ready(function() {
    $("#search-btn").on("click", function (event) {
        event.preventDefault();

        var location

        var apiKey = "b9cd52a37f4e83dc74f86603a4adc81a";

        var queryURL =
          "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#weather-now").append([
                $("<h2>", { class: ""})


            ])


        })  
    
    
    
    
    
    
        });


});