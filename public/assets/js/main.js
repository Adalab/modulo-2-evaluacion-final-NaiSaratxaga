'use strict';

// Select from HTML
const cocktailsList = document.querySelector('.js_listResults');
const searchInput = document.querySelector('.js_input');
const searchButton = document.querySelector('.js_buttonSearch');
const resetButton = document.querySelector('.js_buttonReset');

const imageFallback =
  'https://via.placeholder.com/150/ffffff/666666/?text=no-image';

let cocktails = [];

// functions
function getData() {
  const cocktailTitleToSearch = searchInput.value;
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailTitleToSearch}`
  )
    .then((response) => response.json())
    .then((data) => {
      cocktails = data.drinks;
      renderCocktails(cocktails);
    });
}

function renderCocktails(cocktails) {
  cocktailsList.innerHTML = '';
  if (!cocktails) {
    const cocktailTitleToSearch = searchInput.value;
    cocktailsList.innerHTML = `<li class="no-cocktails">There are no cocktails for the search: ${cocktailTitleToSearch}</li>`;
  }

  for (const cocktail of cocktails) {
    const imageSrc = cocktail.strDrinkThumb
      ? cocktail.strDrinkThumb
      : imageFallback;

    cocktailsList.innerHTML += `
      <li class="cocktail" id=${cocktail.idDrink}>
        <h2 class="drink-name">
          ${cocktail.strDrink}
        </h2>
        <img src=${imageSrc} class="img" alt="cocktail">
      </li>`;
  }
}

// Callback functions
// Reevaluates if the search button is disabled or not
// based on if there is text to search by
function setSearchButtonState() {
  searchInput.value
    ? (searchButton.disabled = false)
    : (searchButton.disabled = true);
}

function onSearchButtonClick(event) {
  event.preventDefault();
  getData();
}

function init() {
  // Subscriptions
  searchInput.addEventListener('keyup', setSearchButtonState);
  searchButton.addEventListener('click', onSearchButtonClick);

  // Sets the disable or enable state for the search button
  setSearchButtonState();
}

// setup the page
init();

//# sourceMappingURL=main.js.map
