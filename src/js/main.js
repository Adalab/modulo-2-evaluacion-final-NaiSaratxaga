'use strict';

// Select from HTML
const listCocktails = document.querySelector('.js_list');
const input = document.querySelector('.js_input');
const buttonSearch = document.querySelector('.js_buttonSearch');
const buttonReset = document.querySelector('.js_buttonReset');

let cocktails = [];

// Paint HTML

function handleClickSearch() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      cocktails = data.cocktails;
    });
}

// Buttons
buttonSearch.addEventListener('click', handleClickSearch);

// 1- start app -- Cuando carga la pagina
//getLocalStorage();//
