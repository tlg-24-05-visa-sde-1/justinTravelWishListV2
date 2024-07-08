// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize listArray from localStorage or an empty array if no data exists
  let listArray = JSON.parse(localStorage.getItem("destinations")) || [];

  // Select DOM elements
  let form = document.getElementById("form");
  let ul = document.getElementById("cardList");
  let listTitle = document.getElementById("listTitle");

  // shared part of endpoint for unsplash used in submit event handler and edit.
  let baseUrl = "https://api.unsplash.com/photos/random?";
  let client_id = "client_id=M4TnnwO352fWXw7OpNg9YSQSfr1KX_tBcsS3q2PZapg";
  let count = "&count=1";

  function setListTitle() {
    if (listArray.length > 0) {
      listTitle.innerHTML = `<h2>My Wish List</h2>`;
    } else {
      listTitle.innerHTML = `<h2>Enter Destination Details</h2>`;
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
    ul.append(card);
  });

  // Form submit event listener to add new cards
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let destination = document.getElementById("destination").value.trim();
    let location = document.getElementById("location").value.trim();
    let photoUrl;
    let description = document.getElementById("description").value.trim();
    getPhoto();
    //function for getting photo from unsplash api
    function getPhoto() {
      let query = `&query=${destination}`;
      let endpoint = `${baseUrl}${client_id}${count}${query}`;

      fetch(endpoint)
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          }
          alert("No photos found for location! Please enter a new location");
          throw Error(`Response status: ${response.status}`);
        })
        .then((data) => {
          console.log(data);
          photoUrl = data[0].urls.regular;
          console.log(photoUrl);
          let newCard = { destination, location, photoUrl, description };
          listArray.push(newCard);
          localStorage.setItem("destinations", JSON.stringify(listArray));

          let card = createCard(destination, location, photoUrl, description);
          //ul.insertBefore(card, ul.firstChild);
          ul.appendChild(card);
          setListTitle();
          form.reset();
        })
        .catch((error) => console.error("Error fetching photo", error));
    }
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

        let query = `&query=${editedDestination}`;
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
});
