import { listArray, setListTitle } from "./script.js";

let ul = document.getElementById("cardList");

// Event listener for delete button
export default ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteButton")) {
    let card = e.target.closest("li");
    let cardIndex = Array.from(ul.children).indexOf(card);

    listArray.splice(cardIndex, 1);
    localStorage.setItem("destinations", JSON.stringify(listArray));
    card.remove();
    setListTitle();
  }
});
