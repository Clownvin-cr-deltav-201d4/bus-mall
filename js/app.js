(() => {
  'use strict';

  class Product {
    constructor(name, ext = 'jpg') {
      this.name = name;
      this.image = `img/${name}.${ext}`;
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

  const products = [
    new Product('bag'),
    new Product('banana'),
    new Product('bathroom'),
    new Product('boots'),
    new Product('breakfast'),
    new Product('bubblegum'),
    new Product('chair'),
    new Product('cthulhu'),
    new Product('dog-duck'),
    new Product('dragon'),
    new Product('pen'),
    new Product('pet-sweep'),
    new Product('scissors'),
    new Product('shark'),
    new Product('sweep', 'png'),
    new Product('tauntaun'),
    new Product('unicorn'),
    new Product('usb', 'gif'),
    new Product('water-can'),
    new Product('wine-glass'),
  ];

  var cycles = 0;

  function disableProducts() {
    products.forEach((product) => product.disable());
  }

  var shownLastTime = [];

  function showNextProducts(count) {
    //TODO potentially do something else with "images"
    //Like, move to pure HTML for example.
    var images = document.createElement('div');
    images.id = 'product-set';
    var options = products.filter((value) => {
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
      result.textContent = `${product.name} - ${product.timesClicked}`;
      resultsList.appendChild(result);
    });
    var root = document.getElementById('root');
    root.appendChild(resultsList);
  }

  function clickProduct(product) {
    product.click();
    if (cycles++ < 25) {
      showNextProducts(5);
    } else {
      disableProducts();
      showResults();
    }
  }

  showNextProducts(5);

})();
