let product_img = document.querySelector(".details .img img");
let content_container = document.querySelector(".content");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let homeBtn = document.querySelector("#home");
let incrementButton = document.querySelector("#increment");
let decrementButton = document.querySelector("#decrement");
let quantityInput = document.querySelector("#quantity");
let confirmBtn = document.querySelector("#confirm");
let addToCardLength = document.querySelector("#card_length span");
let logOut_btn = document.querySelector("#logOut");

logOut_btn.addEventListener("click", () => {
  location.href = "../../../index.html";
});

incrementButton.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});
decrementButton.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) - 1;
});
let product = JSON.parse(localStorage.getItem("selectedProduct"));
homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `../home.html`;
});
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addToCardLength.textContent = parseInt(localStorage.length);
  Swal.fire({
    title: "Good job!",
    text: "Thanks order will come to you as soon as possible!",
    icon: "success",
  });
});
if (product) {
  product_img.src = `${product.thumbnail}`;
  product_title.textContent = `${product.title}`;
  product_price.textContent = `$${product.price}`;
} else {
  document.body.innerHTML = "<p>No product found</p>";
}
