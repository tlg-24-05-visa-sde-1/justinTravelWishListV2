export default function weather() {
  let baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let lat;
  let long;
  let api_key = "3b0d5f297753bea3ead25f1cca442bac";
  let endpoint;
  let weatherDiv = document.getElementById("weatherDiv");
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude);
    lat = position.coords.latitude;
    long = position.coords.longitude;
    endpoint = baseUrl + "lat=" + lat + "&lon=" + long + "&appid=" + api_key;

    fetch(endpoint, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error("Error fetching data: ", response.status);
      })
      .then((data) => {
        //${data.list.main.temp}
        console.log(data);
        let temperature = (
          (data.main.temp - 273.15) * (9 / 5) +
          32
        ).toPrecision(2);
        weatherDiv.innerHTML = `
        <div>
              <h3>Current weather in ${data.name}:</h3>

             <p>${data.weather[0].description} </p>
              <h5>Temperature:</h5>
              <p>${temperature} degrees Fahrenheit</p>

            </div>
        `;
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  });
}
