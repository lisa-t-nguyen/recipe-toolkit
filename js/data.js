/* exported data */
/* exported shoppingList */
/* exported favorites */

var data = {
  view: 'home',
  recipes: [],
  nextRecipeId: 1
};

var favorites = [];

var shoppingList = [];
var previousShoppingListJSON = localStorage.getItem('javascript-local-storage');
var previousDataJSON = localStorage.getItem('View Data');
var previousFavoritesJSON = localStorage.getItem('favoriteRecipes');

if (previousFavoritesJSON !== null) {
  favorites = JSON.parse(previousFavoritesJSON);
}

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

if (previousShoppingListJSON !== null) {
  shoppingList = JSON.parse(previousShoppingListJSON);
}

window.addEventListener('beforeunload', function (event) {
  var shopListJSON = JSON.stringify(shoppingList);
  localStorage.setItem('javascript-local-storage', shopListJSON);
});

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('View Data', dataJSON);
});
