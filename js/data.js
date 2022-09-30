/* exported data */
/* exported shoppingList */
var data = {
  view: 'home',
  heart: ''
};

var shoppingList = [];
var previousShoppingListJSON = localStorage.getItem('javascript-local-storage');
var previousDataJSON = localStorage.getItem('View Data');

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
