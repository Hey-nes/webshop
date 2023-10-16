document.querySelector(".cart-open").addEventListener("click", () => {
  document.querySelector(".app").classList.toggle("cart-open");
});

document.querySelector(".cart-close").addEventListener("click", () => {
  document.querySelector(".app").classList.remove("cart-open");
});

fetch("https://fakestoreapi.com/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var productCards = document.querySelectorAll(".product-card");

    for (var i = 0; i < productCards.length; i++) {
      var productData = data[i];

      productCards[i].querySelector("h3").textContent = productData.title;
      productCards[i]
        .querySelector("img")
        .setAttribute("src", productData.image);
      productCards[i].querySelector("p").textContent = productData.description;
      productCards[i].querySelector("strong").textContent =
        productData.price + "$";
      productCards[i].querySelector("span").textContent =
        productData.rating.rate + "/10";
    }
  });
