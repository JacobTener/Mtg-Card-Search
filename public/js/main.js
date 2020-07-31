const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const matchList = document.querySelector(".match-list");
const loading = document.querySelector("#loading");
const queryText = document.querySelector("#query-text");
const navBtn = document.querySelector(".navbar-toggler");
const navToggle = document.querySelector("#navbarColor02");

/**
 *  Fetching and filters data from api
 *  Also handles text display changes before/during/after query
 * @param {*} searchText
 */
const searchCards = async (searchText) => {
  queryText.textContent = "Free queries take a little while..";
  gif = document.createElement("img");
  gif.src = "../img/200w.webp";
  gif.className += "gif";
  loading.appendChild(gif);
  const res = await fetch(
    `https://api.magicthegathering.io/v1/cards?name=${searchText}`
  );
  const data = await res.json();
  const cards = data.cards;

  let matches = cards.filter((card, index) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    // if (card.imageUrl != null) {
    return card.name.match(regex) && cards.indexOf(card) === index;
    //}
  });
  outputHtml(matches);
  loading.textContent = "";
  queryText.textContent = "";
};

/**
 * Handles displaying cards to page
 * @param {} matches
 */
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
          <div class="card text-white mb-3 text-center">
              <a href="https://www.mtggoldfish.com/price/${
                match.setName
              }/${match.name.replace(/,|'/g, "")}#online" target="_blank">
              <img src=${
                match.imageUrl
              } class="cardImage" alt="Not Found" onerror=this.src="../img/back.png"></a>
              <h6 class="mt-2">${match.name} (${match.setName})</h4>
          </div>
          `
      )
      .join("");

    matchList.innerHTML = html;
    console.log(matches);
  }
};
/**
 * Listeners for button/enter press to fire query
 */
searchBtn.addEventListener("click", () => searchCards(search.value));
search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) searchBtn.click();
});
/**
 * Listener for nav button press - Toggles navbar
 */
navBtn.addEventListener("click", () => {
  if (navToggle.classList.contains("show")) {
    navToggle.classList.remove("show");
  } else {
    navToggle.classList += " show";
  }
});
