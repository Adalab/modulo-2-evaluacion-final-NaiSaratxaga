'use strict';

// Select from HTML
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchButton');
const resetButton = document.querySelector('.js_resetButton');

const cocktailsSearchResultList = document.querySelector(
  '.js_cocktailsSearchResultList'
);
const cocktailsFavList = document.querySelector('.js_cocktailsFavList');

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

function cleanCocktailsResults() {
  cocktailsSearchResultList.innerHTML = '';
}

function renderCocktails(cocktails) {
  cleanCocktailsResults();
  if (!cocktails) {
    const cocktailTitleToSearch = searchInput.value;
    cocktailsSearchResultList.innerHTML = `<li class="no-cocktails">There are no cocktails for the search: ${cocktailTitleToSearch}</li>`;
    return;
  }

  for (const cocktail of cocktails) {
    const imageSrc = cocktail.strDrinkThumb || imageFallback;
    const favClass = isAlreadyInFavs(cocktail.idDrink) ? 'fav-cocktail' : '';

    cocktailsSearchResultList.innerHTML += `
    <li class="main--cocktail-card ${favClass}" onClick="addToFav(this)" id=${cocktail.idDrink}>
        <h2 class="drink-name">
          ${cocktail.strDrink}
        </h2>
        <img src=${imageSrc} class="img" alt="cocktail">
    </li>`;
  }
}

// Favourites
function isAlreadyInFavs(cocktailId) {
  return favCocktails.find((cocktail) => cocktail.idDrink === cocktailId);
}

function unmarkAsFavoruite(cocktailId) {
  const cocktailElement = document.getElementById(cocktailId);
  if (cocktailElement) {
    cocktailElement.classList.remove('fav-cocktail');
  }
}

function addToFav(cocktailElementToAdd) {
  const selectedCocktailId = cocktailElementToAdd.id;

  if (isAlreadyInFavs(selectedCocktailId)) {
    return;
  }

  cocktailElementToAdd.classList.add('fav-cocktail');
  const selectedCocktail = cocktails.find(
    (cocktail) => cocktail.idDrink === selectedCocktailId
  );
  favCocktails.push(selectedCocktail);

  renderFavouriteCocktails(favCocktails);
  saveFavsToLocalStorage();
}

function removeFromFav(cocktailFavElementToRemove) {
  const cocktailIdToRemoveFromFav = cocktailFavElementToRemove.id;

  favCocktails = favCocktails.filter(
    (cocktail) => cocktail.idDrink !== cocktailIdToRemoveFromFav
  );

  renderFavouriteCocktails(favCocktails);
  unmarkAsFavoruite(cocktailIdToRemoveFromFav);
  saveFavsToLocalStorage();
}

function loadFavsFromLocalStorage() {
  favCocktails = JSON.parse(localStorage.getItem('favouriteCocktails')) || [];
  renderFavouriteCocktails(favCocktails);
}

function saveFavsToLocalStorage() {
  localStorage.setItem('favouriteCocktails', JSON.stringify(favCocktails));
}

function renderFavouriteCocktails(favouriteCocktails) {
  cocktailsFavList.innerHTML = '';
  if (!favouriteCocktails.length) {
    cocktailsFavList.innerHTML = `<li class="no-fav">There are no fav cocktails </li>`;
  }

  for (const favouriteCocktail of favouriteCocktails) {
    const imageSrc = favouriteCocktail.strDrinkThumb
      ? favouriteCocktail.strDrinkThumb
      : imageFallback;

    cocktailsFavList.innerHTML += `
      <li class="cocktail" onClick="removeFromFav(this)" id=${favouriteCocktail.idDrink}>
        <h2 class="drink-name text">
          ${favouriteCocktail.strDrink}
        </h2>
        <img src=${imageSrc} class="img" alt="cocktail">
      </li>`;
  }
}

// Reset
function handleClickReset() {
  cocktails = [];
  cleanCocktailsResults();
  searchInput.value = '';

  setSearchButtonState();
}

// Search
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

  // Loads the already saved favourites
  loadFavsFromLocalStorage();
}

// setup the page
init();
