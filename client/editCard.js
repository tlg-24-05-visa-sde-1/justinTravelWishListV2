import { listArray, baseUrl, client_id, count } from "./script.js";

let ul = document.getElementById("cardList");

export default ul.addEventListener("click", (e) => {
  let editedCard = e.target.closest("li");

  let cardIndex = Array.from(ul.children).indexOf(editedCard);

  if (e.target.classList.contains("editButton")) {
    let editedDestination = listArray[cardIndex].destination;
    let editedLocation = listArray[cardIndex].location;
    let editedPhotoUrl = listArray[cardIndex].photoUrl;
    let editedDescription = listArray[cardIndex].description;

    let newDestination = prompt("Enter new name", editedDestination);
    if (newDestination !== null && newDestination !== "") {
      editedDestination = newDestination;

      let query = `&query=${editedDestination}&query=${editedLocation}`;
      let endpoint = `${baseUrl}${client_id}${count}${query}`;
      fetch(endpoint)
        .then((response) => {
          if (response.ok) return response.json();
          throw Error(`Response error: ${response.status}`);
        })
        .then((data) => {
          editedPhotoUrl = data[0].urls.regular;
          let newLocation = prompt("Enter new location", editedLocation);
          if (newLocation !== null && newLocation !== "") {
            editedLocation = newLocation;
          }

          let newDescription = prompt(
            "Enter new description",
            editedDescription
          );
          if (newDescription !== null && newDescription !== "") {
            editedDescription = newDescription;
          }

          editedCard.innerHTML = `
        <div class="card">
          <img src="${editedPhotoUrl}" class="card-img-top img-fluid" alt="a picture of ${editedDestination} in ${editedLocation}" />
          <div class="card-body">
            <h4 class="card-title">${editedDestination}</h4>
            <h5 class="card-title">${editedLocation}</h5>
            <p${editedLocation}</p>
            <p class="card-text">${editedDescription}</p>
            <div class="container d-flex buttonDiv">
              <button class="btn btn-warning editButton">Edit</button>
              <button class="btn btn-danger deleteButton">Remove</button>
            </div>
          </div>
        </div>
      `;

          listArray[cardIndex] = {
            destination: editedDestination,
            location: editedLocation,
            photoUrl: editedPhotoUrl,
            description: editedDescription,
          };
          localStorage.setItem("destinations", JSON.stringify(listArray));
        });
    }
  }
});
