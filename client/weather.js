export default function weather() {
  let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  let lat;
  let long;
  let api_key = "3b0d5f297753bea3ead25f1cca442bac";
  let endpoint;
  let weatherDiv = document.getElementById("weatherDiv");
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    endpoint = baseUrl + "lat=" + lat + "&lon=" + long + "&appid=" + api_key;

    let map = L.map("map", {
      center: [lat, long],
      zoom: 12,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
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
        //${data.list[0].main.temp}
        console.log(data);
        let temperature = (
          (data.list[0].main.temp - 273.15) * (9 / 5) +
          32
        ).toPrecision(2);
        weatherDiv.innerHTML = `
        <div>
              <h3>Current weather in ${data.city.name}</h3>

             <p>${data.list[0].weather[0].description} </p>
              <h5>Temperature</h5>
              <p>${temperature} degrees Fahrenheit</p>

            </div>
        `;
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  });
}
