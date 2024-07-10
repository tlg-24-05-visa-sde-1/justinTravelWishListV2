import {
  baseUrl,
  client_id,
  count,
  listArray,
  createCard,
  ul,
  setListTitle,
} from "./script.js";

// Form submit event listener to add new cards

let form = document.getElementById("form");

export default form.addEventListener("submit", (e) => {
  e.preventDefault();
  let destination = document.getElementById("destination").value.trim();
  let location = document.getElementById("location").value.trim();
  let photoUrl;
  let description = document.getElementById("description").value.trim();
  //getPhoto();
  fetchPhoto();
  //function for getting photo from unsplash api with promises
  function getPhoto() {
    let query = `&query=${destination}&query=${location}`;
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
  //using async await
  async function fetchPhoto() {
    let query = `&query=${destination}&query=${location}`;
    let endpoint = `${baseUrl}${client_id}${count}${query}`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error fetching data: , ${response.data}`);
      }
      const data = await response.json();
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
    } catch (error) {
      console.log(`${error}`);
    }
  }
});
