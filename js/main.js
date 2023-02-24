/* global uuid, shoppingList */

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
var shopListForm = document.getElementById('shoppinglist-form');
var ulShopList = document.getElementById('shop-list');
var formSearch = document.querySelector('.formsearch');
var xhr = new XMLHttpRequest();
var searchQuery = '';

// Resets the form input when users search for a recipe

formSearch.addEventListener('submit', function (event) {
  event.preventDefault();
  searchQuery = searchInput.value;
  getRecipe(searchQuery);
  formSearch.reset();
});

// Fetch recipe data from API and loop through recipe data to display on webpage

function getRecipe(name) {
  xhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=' + name + '&app_id=cab05a45&app_key=%20f5402f256b01046291b6033b982b5b4a&imageSize=REGULAR');
  xhr.responseType = 'json';
  data.recipes = [];
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.hits.length; i++) {
      var recipeID = data.nextRecipeId;
      data.nextRecipeId++;
      var recipeObject = {
        recipeTitle: xhr.response.hits[i].recipe.label,
        recipeImg: xhr.response.hits[i].recipe.image,
        calories: Math.round(xhr.response.hits[i].recipe.calories),
        viewRecipe: xhr.response.hits[i].recipe.url,
        recipeID
      };
      var newSearch = createRecipe(recipeObject);
      searchResults.prepend(newSearch);
      data.recipes.unshift(recipeObject);
    }
  });
  xhr.send();
}

// Recipe object created for each search result

var unfilledHeart = 'fa-regular fa-heart recipeheart';
var filledHeart = 'fa-solid fa-heart favoritesrecipeheart';

function createRecipe(recipeObject) {
  var divRecipe = document.createElement('div');
  divRecipe.className = 'recipeitem';
  searchResults.appendChild(divRecipe);
  var recipeImg = document.createElement('img');
  divRecipe.appendChild(recipeImg);
  recipeImg.src = recipeObject.recipeImg;
  recipeImg.setAttribute('alt', recipeObject.recipeTitle);
  var recipeContainer = document.createElement('div');
  recipeContainer.className = 'recipe-container';
  divRecipe.appendChild(recipeContainer);
  var recipeTitle = document.createElement('h6');
  recipeTitle.textContent = recipeObject.recipeTitle;
  recipeTitle.className = 'recipetitle';
  recipeContainer.appendChild(recipeTitle);
  var linkIcon = document.createElement('i');
  linkIcon.className = 'fa-solid fa-link linkicon';
  linkIcon.setAttribute('title', 'View Recipe');
  var viewRecipe = document.createElement('a');
  viewRecipe.setAttribute('href', recipeObject.viewRecipe);
  viewRecipe.setAttribute('target', '_blank');
  viewRecipe.setAttribute('rel', 'noopener noreferrer');
  viewRecipe.appendChild(linkIcon);
  recipeContainer.appendChild(viewRecipe);
  var caloriesContainer = document.createElement('div');
  caloriesContainer.className = 'caloriescontainer';
  divRecipe.appendChild(caloriesContainer);
  var calories = document.createElement('p');
  calories.textContent = 'Calories:' + ' ' + recipeObject.calories;
  calories.className = 'recipedata';
  caloriesContainer.appendChild(calories);
  var dataHeart = document.createElement('i');
  dataHeart.className = unfilledHeart;
  dataHeart.setAttribute('data-heart', recipeObject.recipeID);
  dataHeart.setAttribute('title', 'Favorite');
  caloriesContainer.appendChild(dataHeart);
  dataHeart.addEventListener('click', addToFavorites);
  return divRecipe;
}

// Changes page views when users click on icons on the bottom navigation bar

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.recipes.length; i++) {
    var recipeList = createRecipe(data.recipes[i]);
    searchResults.append(recipeList);
  }
  viewChange(data.view);
});

// Toggled heart icon to be filled when clicked on

function addToFavorites(event) {
  if (event.target.className === unfilledHeart) {
    event.target.className = filledHeart;
  } else if (event.target.className === filledHeart) {
    event.target.className = unfilledHeart;
  }
}

// Navigation icons functionality

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

// Navigation icons

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

// Shopping list

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

// Resets input bar when users add an item to shopping list

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
