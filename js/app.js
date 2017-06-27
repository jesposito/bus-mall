'use strict';

//my jsbin https://jsbin.com/pubewewupo/edit?js,console

var allSets = [];
var images = [];
var totalClicks = 0;

function getDate() {
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth() + 1;
  var d = n.getDate();
  var newDate = document.createTextNode(m + '/' + d + '/' + y);
  var dateField = document.getElementById('date');
  dateField.appendChild(newDate);
}

getDate();

function Image(id,name,path) {
  images.push(this);
  this.name = name;
  this.path = path;
  this.id = id;
  this.shown = 0;
  this.clicked = 0;
  this.percentShown = 0;
}

var bag = new Image('bag','Bag','img/bag.jpg');
var banana = new Image('banana','Banana','img/banana.jpg');
var bathroom = new Image('bathroom','Bathroom','img/bathroom.jpg');
var boots = new Image('boots','Boots','img/boots.jpg');
var breakfast = new Image('breakfast','Breakfast','img/breakfast.jpg');
var bubblegum = new Image('bubblegum','Bubblegum','img/bubblegum.jpg');
var chair = new Image('chair','Chair','img/chair.jpg');
var cthulhu = new Image('cthulhu','Cthulhu','img/cthulhu.jpg');
var dogDuck = new Image('dogduck','Dog Duck','img/dog-duck.jpg');
var dragon = new Image('dragon','Dragon','img/dragon.jpg');
var pen = new Image('pen','Pen','img/pen.jpg');
var petSweep = new Image('petsweep','Pet Sweep','img/pet-sweep.jpg');
var scissors = new Image('scissors','Scissors','img/scissors.jpg');
var shark = new Image('shark','Shark','img/shark.jpg');
var sweep = new Image('sweep','Sweep','img/sweep.png');
var tauntaun = new Image('tauntaun','Taun Taun','img/tauntaun.jpg');
var unicorn = new Image('unicorn','Unicorn','img/unicorn.jpg');
var usb = new Image('usb','USB','img/usb.gif');
var waterCan = new Image('watercan','Water Can','img/water-can.jpg');
var wineGlass = new Image('wineglass','Wine Glass','img/wine-glass.jpg');

function shuffleSet() {
  images = images.filter(function(elem, index, self) {return index == self.indexOf(elem);}).sort(function() {return 0.5 - Math.random();});
  return images;
}

function makeSets() {
  var prevSet = [];
  var tempSet = [];
  while (allSets.length < 25) {
    tempSet = [];
    var randObj = [];
    while (tempSet.length < 3) {
      var randomSet = shuffleSet();
      randObj = randomSet.slice(0, 1)[0];
      if (tempSet.indexOf(randObj) === -1 && prevSet.indexOf(randObj) === -1) {
        tempSet.push(randObj);
      }
    }
    allSets.push(tempSet);
    prevSet = tempSet;
  }
}
makeSets();
displaySet();

function clearImages(className) {
  var imgClass = document.getElementsByClassName(className);
  while(imgClass[0]) {
    imgClass[0].parentNode.removeChild(imgClass[0]);
  }
}

function displaySet() {
  var currentSet = allSets[totalClicks];
  var imgEl;
  for (var j = 0; j < 3; j++) {
    var imgDiv = document.getElementById('photo-grid');
    console.log(imgDiv);
    var currentImgObj = currentSet[j];
    imgEl = document.createElement('img');
    imgEl.setAttribute('src', currentImgObj.path);
    imgEl.setAttribute('alt', currentImgObj.name);
    imgEl.setAttribute('id', currentImgObj.id);
    imgEl.setAttribute('class', 'photo-grid-item');
    imgDiv.appendChild(imgEl);
    currentImgObj.shown ++;
  }
  imageClickListener();
}

function imageClickListener() {
  var resultsDisplay = document.getElementsByClassName('photo-grid-item');
  for (var i = 0; i < resultsDisplay.length; i++){
    resultsDisplay[i].addEventListener('click', imgClicked);
  }
}

function imgClicked(event) {
  var elImg = event.target;
  var imgID = elImg.id;
  addClicks(imgID);
  clearImages('photo-grid-item');
  if (totalClicks < 25) {
    displaySet();
  } else {
    calcShown();
    console.log(images[0].percentShown);
    console.log(images[1].percentShown);
    console.log(images[2].percentShown);
  }
}

function addClicks(id) {
  for (var i = 0; i < images.length; i++) {
    console.log(images.length);
    if (images[i].id == id) {
      totalClicks ++;
      console.log(totalClicks);
      images[i].clicked ++;
      break;
    }
  }
}

function calcShown() {
  for (var i = 0; i < images.length; i++){
    var currentObj = images[i];
    currentObj.percentShown = (currentObj.clicked / currentObj.shown) * 100;
  }
}
