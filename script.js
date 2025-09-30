console.log('script подключён');
let cart = [];

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total + ' ₽';
}

function addToCart(productId, productName, productPrice) {
  let existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({id: productId, name: productName, price: productPrice, quantity: 1});
  }
  updateCartDisplay();
}

const buttons = document.querySelectorAll('.add-to-cart');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const id = parseInt(button.dataset.id);
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    addToCart(id, name, price);
  });
});
updateCartDisplay();