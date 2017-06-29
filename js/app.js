'use strict';

//my jsbin https://jsbin.com/pubewewupo/edit?js,console

var allSets = [];
var images = [];
var clickTotals = [];
var displayTotals = [];
var labels = [];
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
  this.percentSelected = 0;
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

kickItAllOff();

function kickItAllOff() {
  var imagesTemp = localStorage.stringImages;
  if (imagesTemp) {
    images = JSON.parse(imagesTemp);
    console.log('from local storage ' + images);
    drawTable();
    drawChart();
  } else {
    makeSets();
    displaySet();
  }
}
console.log('just after ' + images);

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
    storeEverything();
    drawTable();
    drawChart();
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
    currentObj.percentSelected = Math.floor((currentObj.clicked / currentObj.shown) * 100);
  }
}

function drawTable() {
  var dataTable = document.getElementById('table');
  var tableHeader = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var tableBody = document.createElement('tbody');
  var headers = ['Item Name','Times Shown','Times Clicked','% Selected'];
  for(var h = 0; h < headers.length;h++) {
    var headerCell = document.createElement('th');
    headerCell.textContent = headers[h];
    headerRow.appendChild(headerCell);
  }
  tableHeader.appendChild(headerRow);
  dataTable.appendChild(tableHeader);
  for(var i = 0; i < images.length; i++) {
    var currentObj = images[i];
    var newRow = document.createElement('tr');
    var cellData = [currentObj.name,currentObj.shown,currentObj.clicked,currentObj.percentSelected + '%'];
    for(var r = 0; r < cellData.length; r++) {
      var newCell = document.createElement('td');
      newCell.textContent = cellData[r];
      newRow.appendChild(newCell);
    }
    tableBody.appendChild(newRow);
  }
  dataTable.append(tableBody);
}

function chartLabels() {
  for (var i = 0; i < images.length; i++) {
    labels[i] = images[i].name;
  }
}

function chartClickTotals() {
  for (var i = 0; i < images.length; i++) {
    clickTotals[i] = images[i].clicked;
  }
}

function chartDisplayTotals() {
  for (var i = 0; i < images.length; i++) {
    displayTotals[i] = images[i].shown;
  }
}

function drawChart() {
  chartLabels();
  chartClickTotals();
  chartDisplayTotals();
  var canvas = document.getElementById('vote-chart');
  var rect = canvas.parentNode.getBoundingClientRect();
  var ctx = canvas.getContext('2d');
  Chart.defaults.global.defaultFontSize = 16;
  var voteChart = new Chart(ctx, {
    responsive: true,
    type: 'bar',
    data:
    {
      labels: labels,
      datasets:
      [
        {
          label: 'You chose the item this many times.',
          data: clickTotals,
          backgroundColor : '#9b59b6',
          borderColor : '#8e44ad',
        },
        {
          label: 'We showed the item this many times.',
          data : displayTotals,
          backgroundColor : '#34495e',
          borderColor : '#2c3e50',
        }
      ]
    }
  });
  sizeChart();
}

function sizeChart() {
  var canvas = document.getElementById('vote-chart');
  var rect = canvas.parentNode.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function storeEverything() {
  localStorage.stringImages = JSON.stringify(images);
}
