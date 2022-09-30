/* exported data */
/* exported shoppingList */

var shoppingList = [];
var previousShoppingListJSON = localStorage.getItem('javascript-local-storage');

if (previousShoppingListJSON !== null) {
  shoppingList = JSON.parse(previousShoppingListJSON);
}

window.addEventListener('beforeunload', function (event) {
  var shopListJSON = JSON.stringify(shoppingList);
  localStorage.setItem('javascript-local-storage', shopListJSON);
});
