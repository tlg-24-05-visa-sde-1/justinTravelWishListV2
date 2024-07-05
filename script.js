// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize listArray from localStorage or an empty array if no data exists
  let listArray = JSON.parse(localStorage.getItem("destinations")) || [];

  // Select DOM elements
  let form = document.getElementById("form");
  let ul = document.getElementById("cardList");
  let listTitle = document.getElementById("listTitle");

  function setListTitle() {
    if (listArray.length > 0) {
      listTitle.innerHTML = `<h2>My Wish List</h2>`;
    } else {
      listTitle.innerHTML = `<h2>Enter Destination Details</>`;
    }
  }

  setListTitle();

  // Populate the list with existing data from listArray
  listArray.forEach((item) => {
    let card = createCard(
      item.destination,
      item.location,
      item.photoUrl,
      item.description
    );
    ul.prepend(card);
  });

  // Form submit event listener to add new cards
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let destination = document.getElementById("destination").value.trim();
    let location = document.getElementById("location").value.trim();
    let photoUrl =
      document.getElementById("photoUrl").value.trim() ||
      "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
    let description = document.getElementById("description").value.trim();

    let newCard = { destination, location, photoUrl, description };
    listArray.push(newCard);
    localStorage.setItem("destinations", JSON.stringify(listArray));

    let card = createCard(destination, location, photoUrl, description);
    ul.prepend(card);
    setListTitle();
    form.reset();
  });

  // Function to create a new card element
  function createCard(destination, location, photoUrl, description) {
    let card = document.createElement("li");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card">
        <img src="${photoUrl}" class="card-img-top img-fluid" alt="a picture of ${destination} in ${location}">
        <div class="card-body">
          <h4 class="card-title">${destination}</h4>
          <h5 class="card-title">${location}</h5>
          <p class="card-text">${description}</p>
          <div class="container d-flex buttonDiv">
            <button class="btn btn-warning editButton">Edit</button>
            <button class="btn btn-danger deleteButton">Remove</button>
          </div>
        </div>
      </div>
    `;
    return card;
  }

  // Event listener for delete button
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteButton")) {
      let card = e.target.closest("li");
      let cardIndex = Array.from(ul.children).indexOf(card);

      listArray.splice(cardIndex, 1);
      localStorage.setItem("destinations", JSON.stringify(listArray));
      card.remove();
      setListTitle();
    }
  });

  // Event listener for edit button
  ul.addEventListener("click", (e) => {
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
      }
      let newLocation = prompt("Enter new location", editedLocation);
      if (newLocation !== null && newLocation !== "") {
        editedLocation = newLocation;
      }
      let newPhotoUrl = prompt("Enter new photo url", editedPhotoUrl);
      if (newPhotoUrl !== null && newPhotoUrl !== "") {
        editedPhotoUrl = newPhotoUrl;
      }
      let newDescription = prompt("Enter new description", editedDescription);
      if (newDescription !== null && newDescription !== "") {
        editedDescription = newDescription;
      }
      editedCard.innerHTML = `
        <div class="card">
          <img src="${editedPhotoUrl}" class="card-img-top img-fluid" alt="a picture of ${editedPhotoUrl} in ${editedLocation}" />
          <div class="card-body">
            <h4 class="card-title">${editedDestination}</h4>
            <h5> class="card-title">${editedLocatin}</h5>
            <p>${editedLocation}</p>
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
    }
  });
});
