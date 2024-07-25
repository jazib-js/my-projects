let searchBtn = document.getElementById("searchBtn");
document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    getInfo()

  }
})



function getInfo() {
  const newName = document.getElementById("cityInput");
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = newName.value +" today weather overview";
  let city_name = newName.value;

  console.log(city_name);

  // Fetch weather data using async/await for cleaner handling of promises
  async function getWeatherData() {
    try {
      const apiKey = "a5f103d5da703fb5ce2a9ad27eeaa9e4"; // Replace with your actual API key
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      // Handle errors gracefully (e.g., display an error message to the user)
      return null; // Indicate failure or provide a default value
    }
  }

  // Call the async function to get weather data and store it in a variable
  getWeatherData()
    .then(data => {
      if (data) { // Check if data was successfully retrieved
        weather = data;
        console.log("Weather data received:", weather);

        for (i = 0; i < 10; i++) {
          document.getElementById("day" + (i + 1) + "min").innerHTML = "Min " + Number(data.list[i].main.temp_min) + "°";

        }
        for (i = 0; i < 10; i++) {
          document.getElementById("day" + (i + 1) + "max").innerHTML = "Max " + Number(data.list[i].main.temp_max) + "°";

        }
        for (i = 0; i < 10; i++) {
          document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
        }


        document.getElementById("mainImage").src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png"
        console.log(Number(data.list[0].main.temp))
        document.getElementById("mainTemp").innerHTML = data.list[0].main.temp + "°";
        console.log(data.list[1].weather[0].main);
        document.getElementById("mainWeather").innerHTML = data.list[1].weather[0].main;
        document.getElementById("location").innerHTML = city_name;
        document.getElementById("pressure").innerHTML =data.list[0].main.pressure + " hPa" ;
        document.getElementById("visibility").innerHTML = data.list[3].visibility / 1000 + "km";
        document.getElementById("humidity").innerHTML =  data.list[0].main.humidity +" %";
        document.getElementById("feelsLike").innerHTML =  data.list[0].main.feels_like +"°";
        document.getElementById("windspeed").innerHTML =  data.list[3].wind.speed+" km/h";
        document.getElementById("description").innerHTML =  data.list[1].weather[0].description;








        for (i = 0; i < 10; i++) {


          const jsonData = { "date_time": data.list[i].dt_txt };
          const dateString = jsonData.date_time;

          // Create a Date object from the string
          const dateObject = new Date(dateString);

          // Function to format the date in the desired format ("mon, 12th July")
          function formatDateToLocaleString(dateObject, locale) {
            const dayOptions = { weekday: 'short', month: 'long', day: 'numeric' }; // Options for desired format
            return dateObject.toLocaleDateString(locale, dayOptions);
          }

          // Format the date for the desired locale (replace 'en-US' with your locale if needed)
          const formattedDate = formatDateToLocaleString(dateObject, 'en-US'); // Example locale

          const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
          const formattedTime = dateObject.toLocaleTimeString('en-US', timeOptions); // Example locale

          console.log(formattedDate); // Output: Sun, 14th July (assuming today is July 14)
          console.log(formattedTime);

          
        // Update your HTML elements with the formatted date and time
          document.getElementById("day" + (i + 1) + "date").innerHTML = formattedDate;
          document.getElementById("day" + (i + 1) + "time").innerHTML = formattedTime;







        }

        const json_Data = { "date_time": data.list[0].dt_txt };
        const date_String = json_Data.date_time;

        // Create a Date object from the string
        const date_Object = new Date(date_String);

        // Function to format the date in the desired format ("mon, 12th July")
        function formatDate(date_Object, lo_cale) {
          const day_Options = { weekday: 'short', month: 'long', day: 'numeric' }; // Options for desired format
          return date_Object.toLocaleDateString(lo_cale, day_Options);
        }

        // Format the date for the desired locale (replace 'en-US' with your locale if needed)
        const formatted_Date = formatDate(date_Object, 'en-US'); // Example locale

        const time_Options = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formatted_Time = date_Object.toLocaleTimeString('en-US', time_Options); // Example locale

        console.log(formatted_Date); // Output: Sun, 14th July (assuming today is July 14)
        console.log(formatted_Time);

        document.getElementById("dateToday").innerHTML = formatted_Date;










        // Use the weather data here (e.g., display it on the page)
      } else {
        console.log("Failed to retrieve weather data.");
        // Handle the case where data retrieval failed
      }
    })
    .catch(error => {
      // console.error("Error processing weather data:", error);
      // Handle errors that might occur during data processing
    });
}




