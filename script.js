let cart = [];

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;
  cart.forEach(item => total += item.price * item.quantity);
  cartCount.textContent = cart.length;
  cartTotal.textContent = total + ' ₽';

  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, productName, productPrice) {
  let existing = cart.find(item => item.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({id: productId, name: productName, price: productPrice, quantity: 1});
  updateCartDisplay();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    addToCart(parseInt(button.dataset.id), button.dataset.name, parseInt(button.dataset.price));
  });
});

updateCartDisplay();