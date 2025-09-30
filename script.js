let cart = [];
const cartList = document.createElement('div');
document.body.appendChild(cartList);

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.name} - ${item.price} ₽ x `;

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.min = 1;
    qtyInput.value = item.quantity;
    qtyInput.addEventListener('change', () => {
      item.quantity = parseInt(qtyInput.value) || 1;
      updateCartDisplay();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Удалить';
    removeBtn.addEventListener('click', () => removeFromCart(item.id));

    itemDiv.appendChild(qtyInput);
    itemDiv.appendChild(removeBtn);
    cartList.appendChild(itemDiv);
  });

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

const orderForm = document.getElementById('order-form');
const orderMessage = document.getElementById('order-message');
orderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  orderMessage.textContent = 'Заказ создан!';
  cart = [];
  updateCartDisplay();
  orderForm.reset();
});