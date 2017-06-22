'use strict';

var img1 = document.getElementById('img1')[0];
var img2 = document.getElementById('img2')[0];
var img3 = document.getElementById('img3')[0];

function Image(name,path) {
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicked = 0;
}

var images = [
  new Image('bag','img/bag.jpg'),
  new Image('banana','img/banana.jpg'),
  new Image('bathroom','img/bathroom.jpg')
];

// var bag = new Image('bag','img/bag.jpg');
// var banana = new Image('banana','img/banana.jpg');
// var bathroom = new Image('bathroom','img/bathroom.jpg');
