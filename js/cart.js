
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function displayCartProduct() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  let result = "";
  cart.forEach((item) => {
    result += `
   <tr class="cart-item">
    <td></td>
    <td class="cart-image">
        <img src=${item.img.singleImage} alt="">
        <i class="bi bi-x delete-cart" data-id=${item.id}></i>
    </td>
    <td>${item.name}</td>
    <td>${item.price.newPrice.toFixed(0)} TL</td>
    <td class="product-quantity">
      <button class="quantity-btn minus-btn" data-id=${item.id}>-</button>
      <span class="quantity-value" data-id=${item.id}>${item.quantity}</span>
      <button class="quantity-btn plus-btn" data-id=${item.id}>+</button>
    </td>
    <td class="product-subtotal">${(
      item.price.newPrice * item.quantity
    ).toFixed(0)} TL</td>
   </tr>
   `;
  });
  cartWrapper.innerHTML = result;
  removeCartItem();
  adjustQuantity();
  saveCartValues();
}

function removeCartItem() {
  const btnDeleteCart = document.querySelectorAll(".delete-cart");
  let cartItems = document.querySelector(".header-cart-count");

  btnDeleteCart.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== Number(id));
      displayCartProduct();
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItems.innerHTML = cart.length;
      saveCartValues();
    });
  });
}

function adjustQuantity() {
  const minusButtons = document.querySelectorAll(".minus-btn");
  const plusButtons = document.querySelectorAll(".plus-btn");
  const quantityValues = document.querySelectorAll(".quantity-value");

  minusButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      const item = cart.find((item) => item.id === Number(id));
      if (item.quantity > 1) {
        item.quantity--;
        displayCartProduct();
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      const item = cart.find((item) => item.id === Number(id));
      item.quantity++;
      displayCartProduct();
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

function saveCartValues() {
  const cartTotal = document.getElementById("cart-total");
  const subtotal = document.getElementById("subtotal");
  const fastCargo = document.getElementById("fast-cargo");
  const fastCargoPrice = 100;
  let itemsTotal = 0;

  cart.length > 0 &&
    cart.map((item) => (itemsTotal += item.price.newPrice * item.quantity));
  console.log(itemsTotal);
  subtotal.innerHTML = `${itemsTotal.toFixed(0)} TL`;
  cartTotal.innerHTML = `${itemsTotal.toFixed(0)} TL`;

  fastCargo.addEventListener("change", function (e) {
    if (e.target.checked) {
      cartTotal.innerHTML = `${(itemsTotal + fastCargoPrice).toFixed(0)} TL`;
    } else {
      cartTotal.innerHTML = `${itemsTotal.toFixed(0)} TL`;
    }
  });
}

displayCartProduct();


