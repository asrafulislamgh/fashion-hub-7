const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  // fetch(url)
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5 class="my-3">${product.title}</h5>
      <p>Category: ${product.category}</p>

      <div class="progress w-50 mx-auto">
        <div class="progress-bar progress-bar-striped rating-color" role="progressbar" style="width: ${
          product.rating.rate * 20
        }%" aria-valuenow="${
      product.rating.rate
    }" aria-valuemin="0" aria-valuemax="5"></div>
      </div>
      <h6>${product.rating.rate}</h6>

      <P>(${product.rating.count})</p>
      <h4>$${product.price}</h4>
      <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="buy-now btn btn-primary rounded-pill" role="button">Add to cart</button>
      <button onclick= "selectData(${
        product.id
      })" id="details-btn" class="btn purple text-white rounded-pill" role="button"  data-bs-toggle="modal" data-bs-target="#modal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Adding data to the Cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted <= 200) {
    setInnerText("delivery-charge", 20);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
//fetchich the selected item
const selectData = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => showData(data));
};
// Showing the selected item on the modal by clicking the detail button
const showData = (product) => {
  document.getElementById("modal-container").innerHTML = "";
  const image = product.image;
  const div = document.createElement("div");
  div.classList.add("text-center");
  div.innerHTML = `<div class="single-product">
    <div>
  <img class="product-image" src=${image}></img>
    </div>
    <h5 class="my-3">${product.title}</h5>
    <p>Category: ${product.category}</p>
    <p>${product.description}</p>

    <div class="progress w-50 mx-auto">
      <div class="progress-bar progress-bar-striped rating-color" role="progressbar" style="width: ${
        product.rating.rate * 20
      }%" aria-valuenow="${
    product.rating.rate
  }" aria-valuemin="0" aria-valuemax="5"></div>
    </div>
    <h6>${product.rating.rate}</h6>

    <P>(${product.rating.count})</p>
    <h4>$${product.price}</h4>
    <button onclick="addToCart(${product.id},${
    product.price
  })" id="addToCart-btn" class="buy-now btn btn-primary rounded-pill" role="button">add to cart</button>

    `;
  document.getElementById("modal-container").appendChild(div);
};
