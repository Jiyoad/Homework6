let bodyDiv = $(".body");
bodyDiv.css("overflow-x", "hidden");
bodyDiv.css("overflow-y", "hidden");
bodyDiv.css("background-image", "linear-gradient(rgb(85, 173, 255), white)");
bodyDiv.css("background-image");

let main = $("<div>");
main.addClass("container");

let column = $("<div>");
column.addClass("col-md-12");

let topHeader = $("<header>");
topHeader.addClass("top-header");
topHeader.css("color", "white");
topHeader.css("text-shadow", "2px 2px 4px rgb(0, 45, 71)");
topHeader.css("background-color", "rgb(0, 109, 172)");
topHeader.css("font-size", "30px");
topHeader.css("position", "fixed");
topHeader.css("left", "0");
topHeader.css("top", "0");
topHeader.css("width", "100%");
topHeader.css("text-align", "center");
topHeader.css("height", "40px");
topHeader.text("Weather Dashboard");

let bottom = $("<footer>")
bottom.addClass("footer");
bottom.css("color", "white");
bottom.css("text-shadow", "2px 2px 4px rgb(0, 45, 71)");
bottom.css("background-color", "rgb(0, 109, 172)");
bottom.css("position", "fixed");
bottom.css("left", "0");
bottom.css("bottom", "0");
bottom.css("width", "100%");
bottom.css("text-align", "center");
bottom.css("height", "30px");
bottom.text("This is a Footer");


let lSide = $("<div>");
lSide.addClass("col-4");
lSide.addClass("aside");
lSide.css("margin-top", "25px");
lSide.css("float", "left");
lSide.css("color", "white");
lSide.css("text-shadow", "2px 2px 4px rgb(0, 109, 172)");

let rSide = $("<div>");
rSide.addClass("col-8");
rSide.addClass("weather");
rSide.css("margin-top", "25px");
rSide.css("float", "left");
rSide.css("text-align", "center");
rSide.css("width", "60%");


let divRow = $("<div>");
divRow.addClass("row");

let searchCity = $("<h1>");
searchCity.addClass("sHeader");
searchCity.text("Search for a City");

let resultCity = $("<h1>");
resultCity.addClass("rHeader");
resultCity.text("Result for a City");

let Hweather = $("<h1>");
Hweather.addClass("sHeader");
Hweather.css("padding", "10px");
Hweather.text("(City Name Here)");

let cityInput = $("<input type = 'text' placeholder='City Name'>");
cityInput.addClass("cityTitle");
cityInput.css("display", "inline-block");


let inputBtn = $("<button>");
inputBtn.addClass("btn-primary");
inputBtn.attr("id", "btnSubmit");
inputBtn.css("border-radius", "0% 15% 15% 0%");
inputBtn.css("display", "inline-block");
inputBtn.css("cursor", "pointer");
inputBtn.text("");

let searchIcon = $("<i>");
searchIcon.addClass("fa fa-search");


bodyDiv.prepend(bottom);
bodyDiv.prepend(main);
bodyDiv.prepend(topHeader);

main.prepend(divRow);
divRow.append(lSide);
lSide.append(searchCity);
lSide.append(cityInput);
lSide.append(inputBtn);
inputBtn.append(searchIcon);
divRow.append(rSide);


rSide.append(resultCity);

$("#btnSubmit").on("click", function () {
    $(".rHeader").text("");
    $(".current-details").remove();
    $("#card-container").remove();
    $(".fHeader").remove();

    var apiKey = "9a19fbaf13864c562d4d6daf33d7bdf5";
    var cName = cityInput.val();
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cName + "&appid=" + apiKey;
    $.ajax({
        url: currentWeatherURL, //same as pulling a url raw.
        method: "GET"
    }).then(function (response) { //when we get a response then.
        console.log(response);
        console.log(cName);

        var temperature = kelvinToCelsius(response.main.temp) + "\u00B0" + "F";
        var humidity = response.main.humidity + "%";
        var windSpeed = response.wind.speed + " MPH";
        var cityName = response.name;

        var currentDetails = $("<p>");
        currentDetails.addClass("current-details");
        var date = new Date();


        $(".rHeader").text(cityName);
        rSide.append(currentDetails);
        currentDetails.append("Temperature: " + temperature);
        currentDetails.append("<br>");
        currentDetails.append("Humidity: " + humidity);
        currentDetails.append("<br>");
        currentDetails.append("Wind Speed: " + windSpeed);
        currentDetails.append("<br>");


        // uv index api
        var apiKey = "9a19fbaf13864c562d4d6daf33d7bdf5";
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function (response) {
            var uvIndex = response.value;
            console.log(response);
            currentDetails.append("UV Index: " + uvIndex);
        });

        // 5 day forecast cards



        var lat = response.coord.lat;
        var long = response.coord.lon;
        var apiKey = "9a19fbaf13864c562d4d6daf33d7bdf5";
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
        $.ajax({
            url: fiveDayURL, //same as pulling a url raw.
            method: "GET"
        }).then(function (response) { //when we get a response then.
            console.log(response);


            var foreDiv = $("<div>");
            foreDiv.addClass("row");
            foreDiv.attr("id", "card-container");
            var cardHeader = $("<h2>");
            cardHeader.addClass("fHeader");
            cardHeader.text("5-Day Forecast");


            rSide.append(foreDiv);
            foreDiv.append(cardHeader);



            for (var i = 0; i < 5; i++) {    //appending each card
                var newDay = date.getDate() + (i + 1);
                var newDate = new Date();
                var forecastTemp = kelvinToCelsius(response.daily[i + 1].temp.day);
                var forecastHumidity = response.daily[i + 1].humidity;

                var iconID = response.daily[i + 1].weather[0].id;
                var ico = response.daily[i + 1].weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/wn/" + ico + "@2x.png";


                var card = $("<div>");
                card.addClass("col-sm-2");
                card.addClass("card");
                var cardInfo = $("<p>");
                cardInfo.addClass("card-text");
                cardInfo.attr("id", iconID);
                var cardIcon = $("<img>");
                cardIcon.addClass("icon-img");
                cardIcon.attr("src", iconUrl)


                newDate.setDate(newDay);
                foreDiv.append(card);
                card.append(cardInfo);
                cardInfo.append(cardIcon);
                // cardInfo.append(iconUrl);
                cardInfo.append("<br>");
                cardInfo.append((newDate.getMonth() + 1 )+ "/" + newDate.getDate() + "/" + newDate.getFullYear());
                cardInfo.append("<br>");
                cardInfo.append("Temp: " + forecastTemp);
                cardInfo.append("<br>");
                cardInfo.append("Humidity: " + forecastHumidity + "%");
                cardInfo.append("<br>");
                
            };
        });

    });



    function kelvinToCelsius(kelvin) {
        var celsius = kelvin - 273.15;
        return Math.round(celsius * 9 / 5 + 32);
    };

});






// var cityName = "Mentor";
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=9a19fbaf13864c562d4d6daf33d7bdf5";

// $.ajax({
//     url: queryURL, //same as pulling a url raw.
//     method: "GET"
// }).then(function (response) { //when we get a response then.
//     console.log(response);
//     console.log(cityName);
// });
