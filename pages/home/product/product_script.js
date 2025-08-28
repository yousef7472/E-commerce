let pathElement = document.querySelector("#path");
let product_img = document.querySelector(".details .img img");
let content_container = document.querySelector(".content");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_rating = document.querySelector("#rating");
let product_description = document.querySelector("#description");
let homeBtn = document.getElementById("home");
console.log(homeBtn);

const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");
const quantityInput = document.querySelector("#quantity");
let addToCardBtn = document.querySelector("#addToCard");

incrementButton.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});
decrementButton.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) - 1;
});
homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `../home.html`;
});
addToCardBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let storedData = localStorage.getItem("selectedProduct");
  let res = JSON.parse(storedData);
  window.location.href = `../checkout/checkout.html?id=${res.id}`;
});

// Get product from localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
  pathElement.textContent = `Home / ${product.category} / ${product.title}`;
  product_img.src = `${product.thumbnail}`;
  product_title.textContent = `${product.title}`;
  product_price.textContent = `Price: $${product.price}`;
  product_rating.textContent = `Rating: ${product.rating}`;
  product_description.textContent = `Description: ${product.description}`;
} else {
  document.body.innerHTML = "<p>No product found</p>";
}
