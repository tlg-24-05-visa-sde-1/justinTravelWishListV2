import getPhoto from "./getCard.js";
import deleteCard from "./deleteCard.js";
import editCard from "./editCard.js";
import weather from "./weather.js";
// shared part of endpoint for unsplash used in submit event handler and edit.
let baseUrl = "https://api.unsplash.com/photos/random?";
let client_id = "client_id=M4TnnwO352fWXw7OpNg9YSQSfr1KX_tBcsS3q2PZapg";
let count = "&count=1";
// Initialize listArray from localStorage or an empty array if no data exists
let listArray = JSON.parse(localStorage.getItem("destinations")) || [];
// Function to create a new card element

// Select DOM elements
let ul = document.getElementById("cardList");
let listTitle = document.getElementById("listTitle");

function createCard(destination, location, photoUrl, description) {
  let card = document.createElement("li");
  card.classList.add("col-sm");
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

function setListTitle() {
  if (listArray.length > 0) {
    listTitle.innerHTML = `<h2>My Wish List</h2>`;
  } else {
    listTitle.innerHTML = `<h2>Enter Destination Details</h2>`;
  }
}

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  weather();

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

  getPhoto;

  deleteCard;

  editCard;
});
export {
  baseUrl,
  client_id,
  count,
  listArray,
  createCard,
  ul,
  listTitle,
  setListTitle,
};
