/* global uuid, shoppingList */

var ulList = document.querySelector('.searchlist');
var searchInput = document.querySelector('.searchinput');
var topBar = document.querySelector('.topbar');
var searchPage = document.querySelector('.searchpage');
var searchResults = document.querySelector('.search-results');
var searchMagnifyIcon = document.querySelector('.searchmagnify');
var bottomBar = document.querySelector('.bottombar');
var homeviewIcon = document.querySelector('.homeview');
var homepage = document.querySelector('.homepage');
var favoritesIcon = document.querySelector('.favoritesheart');
var searchIcon = document.querySelector('.searchglass');
var searchButton = document.getElementById('searchbutton');
var shoppingListView = document.querySelector('.shoppinglist');
var shoppingListIcon = document.querySelector('.shoppingview');
var favoritesView = document.querySelector('.favoritesview');
// var recipeHeart = document.querySelector('.favoritesrecipeheart');
var searchRecipeHeart = document.querySelector('.recipeheart');
// var recipeItem = document.querySelector('.recipeitem');
var shopListForm = document.getElementById('shoppinglist-form');
var ulShopList = document.getElementById('shop-list');

searchResults.addEventListener('click', heartFill);

function getRecipe(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=name&app_id=cab05a45&app_key=%20f5402f256b01046291b6033b982b5b4a&imageSize=REGULAR');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.length; i++) {
      var li = document.createElement('li');
      li.textContent = xhr.response[i].label;
      ulList.appendChild(li);
    }
  });
  xhr.send();
}

getRecipe('chicken');

function heartFill(string) {
  data.heart = string;
  if (string === '1') {
    searchRecipeHeart.className = 'fa-solid fa-heart favoritesrecipeheart';
  }
  if (string === '2') {
    searchRecipeHeart.className = 'fa-solid fa-heart favoritesrecipeheart';
  }
  if (string === '3') {
    searchRecipeHeart.className = 'fa-solid fa-heart favoritesrecipeheart';
  }
  if (string === '4') {
    searchRecipeHeart.className = 'fa-solid fa-heart favoritesrecipeheart';
  }
}

function viewChange(string) {
  data.view = string;
  if (string === 'home') {
    searchInput.className = 'searchpage hidden';
    topBar.className = 'topbar hidden';
    searchPage.className = 'searchpage hidden';
    searchResults.className = 'search-results hidden';
    shoppingListView.className = 'shoppinglist hidden';
    favoritesView.className = 'favoritesview hidden';
    bottomBar.className = 'bottombar hidden';
    homepage.className = 'homepage';
  }
  if (string === 'searchpage') {
    searchInput.className = 'searchpage';
    topBar.className = 'topbar';
    searchPage.className = 'searchpage';
    searchResults.className = 'search-results';
    bottomBar.className = 'bottombar';
    homepage.className = 'homepage hidden';
    searchInput.className = 'searchinput';
    searchMagnifyIcon.className = 'fa-solid fa-magnifying-glass searchmagnify';
    shoppingListIcon.className = 'fa-solid fa-cart-shopping';
    shoppingListView.className = 'shoppinglist hidden';
    searchIcon.className = 'fa-solid fa-magnifying-glass searchglass';
    favoritesIcon.className = 'fa-regular fa-heart';
    favoritesView.className = 'favoritesview hidden';
  }
  if (string === 'shoppinglist') {
    searchInput.className = 'searchpage hidden';
    topBar.className = 'topbar';
    searchPage.className = 'searchpage hidden';
    searchResults.className = 'search-results hidden';
    bottomBar.className = 'bottombar';
    homepage.className = 'homepage hidden';
    shoppingListView.className = 'shoppinglist';
    shoppingListIcon.className = 'fa-solid fa-cart-shopping shoppingview';
    searchIcon.className = 'fa-solid fa-magnifying-glass';
    favoritesIcon.className = 'fa-regular fa-heart';
    favoritesView.className = 'favoritesview hidden';
  }
  if (string === 'favorites') {
    searchInput.className = 'searchpage hidden';
    topBar.className = 'topbar';
    searchPage.className = 'searchpage hidden';
    searchResults.className = 'search-results hidden';
    bottomBar.className = 'bottombar';
    homepage.className = 'homepage hidden';
    shoppingListView.className = 'shoppinglist hidden';
    shoppingListIcon.className = 'fa-solid fa-cart-shopping';
    searchIcon.className = 'fa-solid fa-magnifying-glass';
    favoritesIcon.className = 'fa-solid fa-heart favoritesheart';
    favoritesView.className = 'favoritesview';
  }
}

// viewChange('home');
document.addEventListener('DOMContentLoaded', viewChange(data.view));

homeviewIcon.addEventListener('click', function (event) {
  viewChange('home');
});

searchIcon.addEventListener('click', function (event) {
  viewChange('searchpage');
});

searchButton.addEventListener('click', function (event) {
  viewChange('searchpage');
});

shoppingListIcon.addEventListener('click', function (event) {
  viewChange('shoppinglist');
});

favoritesIcon.addEventListener('click', function (event) {
  viewChange('favorites');
});

function renderList(shopList) {
  var shopListItem = document.createElement('li');
  shopListItem.setAttribute('class', 'list-group-item');

  var formCheck = document.createElement('div');
  formCheck.setAttribute('class', 'form-check d-flex');

  var checkbox = document.createElement('input');
  checkbox.checked = shopList.isCompleted;
  checkbox.setAttribute('id', shopList.shopListID);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'form-check-input');

  var label = document.createElement('label');
  label.setAttribute('for', shopList.shopListID);
  label.setAttribute('class', 'form-check-label flex-grow-1 ml-2');
  label.textContent = shopList.task;

  shopListItem.append(formCheck);
  formCheck.append(checkbox, label);

  return shopListItem;
}

shopListForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var shopList = {
    shopListID: uuid.v4(),
    task: shopListForm.elements.task.value,
    isCompleted: false
  };
  shoppingList.push(shopList);
  ulShopList.append(renderList(shopList));
  shopListForm.reset();
});

ulShopList.addEventListener('change', function (event) {
  var ingredientID = event.target.getAttribute('id');
  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i].shopListID === ingredientID) {
      shoppingList[i].isCompleted = event.target.checked;
      if (event.target.checked === shoppingList[i].isCompleted) {
        // var closestTarget = event.target.closest('.list-group-item');
        // closestTarget.remove();
        shoppingList.splice(i, 1);
      }
      break;
    }
  }
});

for (let i = 0; i < shoppingList.length; i++) {
  var $shopList = renderList(shoppingList[i]);
  ulShopList.appendChild($shopList);
}
