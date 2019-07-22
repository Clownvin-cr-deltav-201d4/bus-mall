(() => {
  'use strict';

  class Product {
    constructor(name, imgName, ext = 'jpg') {
      this.name = name;
      this.image = `img/${imgName}.${ext}`;
      this.timesClicked = 0;
      //Create permanent product element from img tag.
      this.productElement = document.createElement('img');
      this.productElement.id = this.name;
      this.productElement.src = this.image;
      this.productElement.classList.add('product-image');
      this.clickHandler = () => clickProduct(this);
      this.enable();
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
      ++this.timesClicked;
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
  ];

  var iterations = 0;
  var shownLastTime = [];

  function showNextProducts(count) {
    //TODO potentially do something else with "images"
    //Like, move to pure HTML for example.
    var images = document.createElement('div');
    images.id = 'product-set';
    var options = products.filter(value => {
      for (var product of shownLastTime) {
        if (value === product) {
          return false;
        }
      }
      return true;
    });
    shownLastTime = [];
    for (var i = 0; i < count; i++) {
      var selected = options.splice(Math.floor(Math.random() * options.length), 1)[0];
      images.appendChild(selected.getProductElement());
      shownLastTime.push(selected);
    }
    var root = document.getElementById('root');
    root.innerHTML = ''; //Remove all content from root...
    root.appendChild(images);
  }

  function showResults() {
    var resultsList = document.createElement('ul');
    resultsList.id = 'results';
    products.forEach(product => {
      var result = document.createElement('li');
      result.classList.add('result');
      result.textContent = `${product.timesClicked} votes for the ${product.name}`;
      resultsList.appendChild(result);
    });
    var root = document.getElementById('root');
    root.appendChild(resultsList);
  }

  function disableProducts() {
    products.forEach(product => product.disable());
  }

  function clickProduct(product) {
    product.click();
    if (iterations++ < 25) {
      showNextProducts(3);
    } else {
      disableProducts();
      showResults();
    }
  }

  showNextProducts(3);

})();
