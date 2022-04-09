"use strict";const searchInput=document.querySelector(".js_searchInput"),searchButton=document.querySelector(".js_searchButton"),resetButton=document.querySelector(".js_resetButton"),cocktailsSearchResultList=document.querySelector(".js_cocktailsSearchResultList"),cocktailsFavList=document.querySelector(".js_cocktailsFavList"),imageFallback="https://via.placeholder.com/150/ffffff/666666/?text=no-image";let cocktails=[],favCocktails=[];function getCocktails(){const t=searchInput.value;fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+t).then(t=>t.json()).then(t=>{cocktails=t.drinks,renderCocktails(cocktails)})}function cleanCocktailsResults(){cocktailsSearchResultList.innerHTML=""}function renderCocktails(t){if(cleanCocktailsResults(),t)for(const a of t){const t=a.strDrinkThumb||imageFallback,e=isAlreadyInFavs(a.idDrink)?"fav-cocktail":"";cocktailsSearchResultList.innerHTML+=`\n    <li class=" ${e}" onClick="addToFav(this)" id=${a.idDrink}>\n        <h2 class="drink-name">\n          ${a.strDrink}\n        </h2>\n        <img src=${t} class="img" alt="cocktail">\n    </li>`}else{const t=searchInput.value;cocktailsSearchResultList.innerHTML=`<li class="no-cocktails">There are no cocktails for the search: ${t}</li>`}}function isAlreadyInFavs(t){return favCocktails.find(a=>a.idDrink===t)}function unmarkAsFavoruite(t){const a=document.getElementById(t);a&&a.classList.remove("fav-cocktail")}function addToFav(t){const a=t.id;if(isAlreadyInFavs(a))return;t.classList.add("fav-cocktail");const e=cocktails.find(t=>t.idDrink===a);favCocktails.push(e),renderFavouriteCocktails(favCocktails),saveFavsToLocalStorage()}function removeFromFav(t){favCocktails=favCocktails.filter(a=>a.idDrink!==t),renderFavouriteCocktails(favCocktails),unmarkAsFavoruite(t),saveFavsToLocalStorage()}function loadFavsFromLocalStorage(){favCocktails=JSON.parse(localStorage.getItem("favouriteCocktails"))||[],renderFavouriteCocktails(favCocktails)}function saveFavsToLocalStorage(){localStorage.setItem("favouriteCocktails",JSON.stringify(favCocktails))}function renderFavouriteCocktails(t){cocktailsFavList.innerHTML="",t.length||(cocktailsFavList.innerHTML='<li class="no-fav">There are no fav cocktails </li>');for(const a of t){const t=a.strDrinkThumb?a.strDrinkThumb:imageFallback;cocktailsFavList.innerHTML+=`\n      <li class="cocktail" id=${a.idDrink}>\n        <h2 class="drink-name">\n          ${a.strDrink}\n        </h2>\n        <h3 class="main--remove-fav" onClick="removeFromFav('${a.idDrink}')"> 💔 Eliminar</h3>\n        <img src=${t} class="img" alt="cocktail">\n      </li>`}}function handleClickReset(){cocktails=[],cleanCocktailsResults(),searchInput.value="",setSearchButtonState()}function setSearchButtonState(){searchInput.value.length>=3?searchButton.disabled=!1:searchButton.disabled=!0}function searchCocktails(t){t.preventDefault(),getCocktails()}function init(){searchInput.addEventListener("keyup",setSearchButtonState),searchButton.addEventListener("click",searchCocktails),resetButton.addEventListener("click",handleClickReset),setSearchButtonState(),loadFavsFromLocalStorage()}init();