const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const matchList = document.querySelector(".match-list");
const loading = document.querySelector("#loading");

const searchCards = async (searchText) => {
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
    if (card.imageUrl != null) {
      return card.name.match(regex) && cards.indexOf(card) === index;
    }
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
  loading.textContent = "";
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
          <div class="card text-white mb-3 text-center">
              <a href="https://www.mtggoldfish.com/price/${
                match.setName
              }/${match.name.replace(/,/g, "")}#online" target="_blank">
              <img src=${match.imageUrl} class="cardImage"></a>
              <h6 class="mt-2">${match.name}</h4>
          </div>
          `
      )
      .join("");

    matchList.innerHTML = html;
    console.log(matches);
  }
};

searchBtn.addEventListener("click", () => searchCards(search.value));
search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) searchBtn.click();
});
