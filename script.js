let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
  let item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCartDisplay();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.querySelector('.cart-list-container');
  cartList.querySelectorAll('.cart-item').forEach(el => el.remove());

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    const namePrice = document.createElement('span');
    namePrice.textContent = `${item.name} - ${item.price} ₽`;

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

    itemDiv.appendChild(namePrice);
    itemDiv.appendChild(qtyInput);
    itemDiv.appendChild(removeBtn);
    cartList.appendChild(itemDiv);
  });

  document.getElementById('cart-count').textContent = cart.length;
  document.getElementById('cart-total').textContent = total + ' ₽';
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelector('.order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Заказ создан!');
  cart.length = 0;
  updateCartDisplay();
});

updateCartDisplay();
