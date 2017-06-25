'use strict';

//used jsbin to figure the random piece out https://jsbin.com/pubewewupo/edit?js,console

var allSets = [];
var images = [];

function Image(name,path) {
  images.push(this);
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicked = 0;
}

var bag = new Image('Bag','img/bag.jpg');
var banana = new Image('Banana','img/banana.jpg');
var bathroom = new Image('Bathroom','img/bathroom.jpg');
var boots = new Image('Boots','img/boots.jpg');
var breakfast = new Image('Breakfast','img/breakfast.jpg');
var bubblegum = new Image('Bubblegum','img/bubblegum.jpg');
var chair = new Image('Chair','img/chair.jpg');
var cthulhu = new Image('Cthulhu','img/cthulhu.jpg');
var dogDuck = new Image('Dog Duck','img/dog-duck.jpg');
var dragon = new Image('Dragon','img/dragon.jpg');
var pen = new Image('Pen','img/pen.jpg');
var petSweep = new Image('Pet Sweep','img/pet-sweep.jpg');
var scissors = new Image('Scissors','img/scissors.jpg');
var shark = new Image('Shark','img/shark.jpg');
var sweep = new Image('Sweep','img/sweep.png');
var tauntaun = new Image('Taun Taun','img/tauntaun.jpg');
var unicorn = new Image('Unicorn','img/unicorn.jpg');
var usb = new Image('USB','img/usb.gif');
var waterCan = new Image('Water Can','img/water-can.jpg');
var wineGlass = new Image('Wine Glass','img/wine-glass.jpg');

function randomize() {
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
      var randomSet = randomize();
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

//iterate through allSets, each indexOf
     // display current set on the percentage
      
     // on click - record the image that was clicked
