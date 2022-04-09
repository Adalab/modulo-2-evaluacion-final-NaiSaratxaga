'use strict';

// Select from HTML
const cocktailsList = document.querySelector('.js_listResults');
const searchInput = document.querySelector('.js_input');
const searchButton = document.querySelector('.js_buttonSearch');
const resetButton = document.querySelector('.js_buttonReset');
const cocktailsFavList = document.querySelector('.js_listFav');

const imageFallback =
  'https://via.placeholder.com/150/ffffff/666666/?text=no-image';

let cocktails = [];
let favCocktails = [];

// Functions
function getCocktails() {
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
// Favourites
function cocktailSelected(cocktailElementListItem) {
  const selectedCocktailId = cocktailElementListItem.id;

  const isAlreadyInFavs = favCocktails.find(
    (cocktail) => cocktail.idDrink === selectedCocktailId
  );

  if (isAlreadyInFavs) {
    return;
  }

  const selectedCocktail = cocktails.find(
    (cocktail) => cocktail.idDrink === selectedCocktailId
  );
  favCocktails.push(selectedCocktail);
  renderFavouriteCocktails(favCocktails);
}
function cleanCocktailsResults() {
  cocktailsList.innerHTML = '';
}

function renderCocktails(cocktails) {
  cleanCocktailsResults();
  if (!cocktails) {
    const cocktailTitleToSearch = searchInput.value;
    cocktailsList.innerHTML = `<li class="no-cocktails">There are no cocktails for the search: ${cocktailTitleToSearch}</li>`;
    return;
  }

  for (const cocktail of cocktails) {
    const imageSrc = cocktail.strDrinkThumb || imageFallback;

    cocktailsList.innerHTML += `
      <li class="cocktail" onClick="cocktailSelected(this)" id=${cocktail.idDrink}>
        <h2 class="drink-name text">
          ${cocktail.strDrink}
        </h2>
        <img src=${imageSrc} class="img" alt="cocktail">
      </li>`;
  }
}

function renderFavouriteCocktails(favouriteCocktails) {
  cocktailsFavList.innerHTML = '';
  if (!favouriteCocktails) {
    cocktailsFavList.innerHTML = `<li class="no-favs">There are no fav cocktails </li>`;
  }

  for (const favouriteCocktail of favouriteCocktails) {
    const imageSrc = favouriteCocktail.strDrinkThumb
      ? favouriteCocktail.strDrinkThumb
      : imageFallback;

    cocktailsFavList.innerHTML += `
      <li class="cocktail" id=${favouriteCocktail.idDrink}>
        <h2 class="drink-name text">
          ${favouriteCocktail.strDrink}
        </h2>
        <img src=${imageSrc} class="img" alt="cocktail">
      </li>`;
  }
}

function handleClickReset() {
  cocktails: [];
  cleanCocktailsResults('');
  searchInput.value = '';
  setSearchButtonState();
}

// Callback functions
// Reevaluates if the search button is disabled or not
// based on if there is text to search by
function setSearchButtonState() {
  searchInput.value.length >= 3
    ? (searchButton.disabled = false)
    : (searchButton.disabled = true);
}

function searchCocktails(event) {
  event.preventDefault();
  getCocktails();
}

function init() {
  // Subscriptions
  searchInput.addEventListener('keyup', setSearchButtonState);
  searchButton.addEventListener('click', searchCocktails);
  resetButton.addEventListener('click', handleClickReset);
  // Sets the disable or enable state for the search button
  setSearchButtonState();
}

// setup the page
init();

//# sourceMappingURL=main.js.map
