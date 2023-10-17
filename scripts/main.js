document.querySelector(".cart").addEventListener("click", function () {
  document.querySelector(".app").classList.toggle("cart-open");
  updateCartTable();
});

document.querySelector(".cart-close").addEventListener("click", function () {
  document.querySelector(".app").classList.remove("cart-open");
});

document
  .querySelector(".product-modal-close")
  .addEventListener("click", function () {
    document.querySelector(".product-modal").style.display = "none";
  });

fetch("https://fakestoreapi.com/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var productCards = document.querySelectorAll(".product-card");

    for (var i = 0; i < productCards.length; i++) {
      var productData = data[i];
      var card = productCards[i];

      card.querySelector("h3").textContent = productData.title;
      card.querySelector("img").setAttribute("src", productData.image);
      card.querySelector("p").textContent = productData.description;
      card.querySelector("strong").textContent = productData.price + "$";
      card.querySelector("span").textContent = productData.rating.rate + "/10";
    }
  });

var productCards = document.querySelectorAll(".product-card");

productCards.forEach(function (card) {
  card.querySelector(".product-image").addEventListener("click", function (e) {
    var cardTitle = card.querySelector("h3").textContent;
    var cardImageSrc = card.querySelector(".product-image").getAttribute("src");
    var cardDescription = card.querySelector("p").textContent;
    var cardPrice = card.querySelector("strong").textContent;
    var cardRating = card.querySelector("span").textContent;

    var modalTitle = document.querySelector(".product-modal h3");
    var modalImage = document.querySelector(".product-modal img");
    var modalDescription = document.querySelector(".product-modal p");
    var modalPrice = document.querySelector(".product-modal strong");
    var modalRating = document.querySelector(".product-modal span");

    modalTitle.textContent = cardTitle;
    modalImage.setAttribute("src", cardImageSrc);
    modalDescription.textContent = cardDescription;
    modalPrice.textContent = cardPrice;
    modalRating.textContent = cardRating;

    document.querySelector(".product-modal").style.display = "block";
  });
});

document.querySelectorAll(".add-cart").forEach(function (button) {
  button.addEventListener("click", function () {
    const card = button.parentElement;
    const productTitle = card.querySelector("h3").textContent;
    const productPrice = card.querySelector("strong").textContent;

    const product = {
      title: productTitle,
      price: productPrice,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(function (item) {
      return item.title === product.title;
    });

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTable();
    alert("Added to cart");
  });
});

function updateCartTable() {
  const tableBody = document.querySelector(".cart-content table tbody");
  tableBody.innerHTML = "";

  let totalProducts = 0;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(function (product) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="product">${product.title}</td>
      <td class="price">${product.price}</td>
    `;
    tableBody.appendChild(row);

    totalProducts += product.quantity;
  });
}

window.addEventListener("load", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartTable(cart);
});

const checkoutButton = document.querySelector(".checkout");
checkoutButton.addEventListener("click", function () {
  localStorage.removeItem("cart");
  updateCartTable([]);
  alert("Your order has been placed!");
});
