const sliderData = [
  {
    image:
      "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "THINK DIFFERENT.",
    details:
      "Depot is a unique & captivating theme designed specifically for all types of shops and online stores.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1603376575925-467d14313a60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "CONTEMPORARY DESIGN.",
    details:
      "A large set of beautiful & fully flexible homepage layouts lets you create your website quickly & easily.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1640938776314-4d303f8a1380?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "PREMIUM COMFORT.",
    details:
      "One-click import feature lets you import the complete Depot demo content with a single mouse click.",
  },
];

let allProducts_btns = document.querySelectorAll(".products_btn");
console.log(allProducts_btns);

let content = document.querySelector(".content");

function renderProducts(products) {
  content.textContent = "";

  products.forEach((elements) => {
    let card = document.createElement("div");
    card.classList.add("text-center");
    content.appendChild(card);

    let img = document.createElement("img");
    img.src = elements.thumbnail;

    let title = document.createElement("h3");
    title.classList.add("mt-md-4");
    title.textContent = elements.title;

    let price = document.createElement("span");
    price.textContent = `$${elements.price}`;
    card.append(img, title, price);
  });
}

//        fetch products from external json file
fetch("../data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    console.log("Fetched products:", products);
    renderProducts(products);
    allProducts_btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let category = btn.innerText;
        if (category === "all") {
          renderProducts(products);
        } else {
          let filtered = products.filter((p) => p.category === category);
          renderProducts(filtered);
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });

const cardTrack = document.getElementById("card-track");
const fullscreenBg = document.getElementById("fullscreen-bg");
const fullscreenText = document.getElementById("fullscreen-text");
let activeIndex = 0;
let cards = [];

// Create cards from internal JSON for slider
sliderData.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.animationDelay = `${index * 0.1}s`;

  const img = document.createElement("img");
  img.src = item.image;

  const text = document.createElement("h2");
  const details = document.createElement("p");
  details.innerText = item.details;
  text.className = "card-text";
  text.innerText = item.text;

  card.appendChild(img);
  card.appendChild(text);
  cardTrack.appendChild(card);
  cards.push(card);

  // Click to activate
  card.addEventListener("click", () => {
    activeIndex = index;
    updateActiveCard();
    scrollToCard(index);
  });
});

function updateActiveCard() {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === activeIndex);
  });

  fullscreenBg.style.backgroundImage = `url(${sliderData[activeIndex].image})`;
  fullscreenText.innerText = sliderData[activeIndex].details;
}

function scrollToCard(index) {
  const cardWidth = cards[0].offsetWidth + 16;
  const scrollX = cardWidth * index;
  cardTrack.scrollTo({ left: scrollX, behavior: "smooth" });
}

document.getElementById("nav-left").addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + sliderData.length) % sliderData.length;
  updateActiveCard();
  scrollToCard(activeIndex);
});

document.getElementById("nav-right").addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % sliderData.length;
  updateActiveCard();
  scrollToCard(activeIndex);
});

// Initialize
updateActiveCard();
