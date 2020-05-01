window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescribe = document.querySelector(".temp-describe");
    let temperatureWeekDescribe = document.querySelector(".week-temp-describe");
    let temperatureDegree = document.querySelector(".degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-type");
    let temperatureUnit = document.querySelector(".temp-unit");
    let degree = document.querySelector(".degree")

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;

            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;

                    //Get API Elements
                    temperatureDegree.textContent = temperature;
                    temperatureDescribe.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    temperatureWeekDescribe.textContent = data.daily.summary;

                    //Set ICONS
                    setIcons(icon, document.querySelector(".icon"));

                    //Formula for CELCIUS
                    let celcius = (temperature - 32) * (5 / 9);

                    //Formula for FAHRENHEIT
                    let fahrenheit = (temperature * (9 / 5)) + 32;

                    //Change unit of temperature
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureUnit.textContent === "°F") {

                            degree.textContent = Math.floor(celcius);
                            temperatureUnit.textContent = "°C";

                        } else {
                            temperatureUnit.textContent = "°F";
                            degree.textContent = temperature;
                        }
                    })
                });
        });

    } else {
        alert("Your browser dosen't support this!")
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});