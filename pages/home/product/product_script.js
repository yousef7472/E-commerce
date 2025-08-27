let pathElement = document.querySelector("#path");
let product_img = document.querySelector(".details .img img");
let content_container = document.querySelector(".content");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_rating = document.querySelector("#rating");
let product_description = document.querySelector("#description");
const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");
const quantityInput = document.querySelector("#quantity");

incrementButton.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});
decrementButton.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) - 1;
});

// Get product from localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
  pathElement.textContent = `Home / ${product.category} / ${product.title}`;
  product_img.src = `${product.thumbnail}`;
  product_title.textContent = `${product.title}`;
  product_price.textContent = `$${product.price}`;
  product_rating.textContent = `${product.rating}`;
  product_description.textContent = `${product.description}`;
} else {
  document.body.innerHTML = "<p>No product found</p>";
}
