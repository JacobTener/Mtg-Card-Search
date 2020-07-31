const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const matchList = document.querySelector(".match-list");

const searchCards = async (searchText) => {
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
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
          <div class="card text-white mb-3 text-center">
              <h4>${match.name}</h4><img src=${match.imageUrl} class="cardImage">
          </div>
          `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

searchBtn.addEventListener("click", () => searchCards(search.value));
