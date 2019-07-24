(() => {
  'use strict';

  class Product {

    constructor(name, imgName = name, ext = 'jpg') {
      this.name = name;
      this.image = `img/${imgName}.${ext}`;
      if (!(this.timesClicked = window.localStorage.getItem(`${this.name}-click-count`)) || isNaN(this.timesClicked)) {
        this.timesClicked = 0;
      }
      console.log(`${name} starting with ${this.timesClicked}`);
      //Create permanent product element from div tag.
      this.productElement = document.createElement('div');
      this.productElement.id = this.name;
      this.productElement.style.backgroundImage = `url(${this.image})`;
      this.productElement.classList.add('product');
      this.clickHandler = () => clickProduct(this);
      //Create and attach product header.
      let productHeader = document.createElement('h3');
      productHeader.classList.add('product-header');
      productHeader.textContent = name;
      this.productElement.appendChild(productHeader);
    }

    enable() {
      this.productElement.addEventListener('click', this.clickHandler);
    }

    disable() {
      this.productElement.removeEventListener('click', this.clickHandler);
    }

    getProductElement() {
      return this.productElement;
    }

    click() {
      this.timesClicked++;
      window.localStorage.setItem(`${this.name}-click-count`, this.timesClicked);
    }
  }

  var products = [
    new Product('R2D2 Bag', 'bag'),
    new Product('Banana Slicer', 'banana'),
    new Product('Bathroom-Pad', 'bathroom'),
    new Product('Useless Boots', 'boots'),
    new Product('All-in-one Breakfast Machine', 'breakfast'),
    new Product('Meatball Bubblegum', 'bubblegum'),
    new Product('Inverse  Chair', 'chair'),
    new Product('Cthulhu Action Figure', 'cthulhu'),
    new Product('Duck-like Muzzle For Dogs', 'dog-duck'),
    new Product('Dragon Meat', 'dragon'),
    new Product('Utensil Pen', 'pen'),
    new Product('Pet-Sweep', 'pet-sweep'),
    new Product('Pizza Scissors', 'scissors'),
    new Product('Shark Attack Sleeping Bag', 'shark'),
    new Product('Terribly Unhealthy Baby Mop', 'sweep', 'png'),
    new Product('Tauntaun Sleeping Bag', 'tauntaun'),
    new Product('Unicorn Meat', 'unicorn'),
    new Product('Tentacle USB', 'usb', 'gif'),
    new Product('Unusable Watering Can', 'water-can'),
    new Product('Enclosed Wine-Glass', 'wine-glass'),
    /// Begining of non-canon Products, comment out if not wanted. ///
    new Product('Animal Footprint Shoes', 'animal-footprint-shoes'),
    new Product('Bacon Frosting', 'bacon-frosting'),
    new Product('Butter Stick', 'butter', 'jpeg'),
    new Product('Diet Water', 'diet-water'),
    new Product('Fork On Chain', 'fork-on-chain'),
    new Product('Fork Pizza Cutter', 'fork-pizza-cutter'),
    new Product('Useless Fork', 'fork'),
    new Product('Hand Squirrel', 'hand-squirrel'),
    new Product('Keyboard Waffle Maker', 'keyboard-waffle'),
    new Product('Noodley Knife', 'noodle-knife'),
    new Product('USB Pet Rock', 'pet-rock'),
    new Product('Useless Spoon', 'spoon'),
  ];

  var iterations = 0;
  var shownLastTime = [];

  var productCount = 10;

  function clickProduct(product) {
    product.click();
    if (iterations++ < 25) {
      showNextProducts(productCount);
    } else {
      disableProducts();
      showResults();
    }
  }

  function enableProducts() {
    products.forEach(product => product.enable());
  }

  function disableProducts() {
    products.forEach(product => product.disable());
  }

  function showNextProducts(count) {
    var images = document.createElement('div');
    images.id = 'product-set';

    var options = products.filter(value => !shownLastTime.includes(value));
    shownLastTime = [];
    for (var i = 0; i < count && i < options.length; i++) {
      var selected = options.splice(Math.floor(Math.random() * options.length), 1)[0];
      images.appendChild(selected.getProductElement());
      shownLastTime.push(selected);
    }
    var root = document.getElementById('root');
    root.innerHTML = ''; //Remove all content from root...
    root.appendChild(images);
  }

  function createChart(context, labels, dataLabel, data, palette = ['#9dff00', '#009dff', '#ff009d',], borderPalette = ['#747474'], borderWidth = 1) {

    var bgColors = [];
    var borderColors = [];

    for (var i = 0; i < data.length; i++) {
      bgColors.push(palette[i % palette.length]);
      borderColors.push(borderPalette[i % borderPalette.length]);
    }

    return new Chart(context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: dataLabel,
          data: data,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: borderWidth,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  function showResults() {
    var labels = [];
    var data = [];

    products.forEach(product => {
      labels.push(product.name);
      data.push(product.timesClicked);
    });

    var canvas = document.createElement('canvas');
    canvas.id = 'results';
    var context2d = canvas.getContext('2d');

    createChart(context2d, labels, 'Number of Votes', data);

    var root = document.getElementById('root');
    root.appendChild(canvas);
  }

  enableProducts();
  showNextProducts(productCount);

})();
