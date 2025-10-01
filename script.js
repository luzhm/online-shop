let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
  let item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
    toggleButtonToCounter(id);
  }
  updateCartDisplay();
}

function decreaseFromCart(id) {
  let item = cart.find(p => p.id === id);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
      toggleCounterToButton(id);
    }
  }
  updateCartDisplay();
}

function toggleButtonToCounter(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  const button = card.querySelector("button");
  button.style.display = "none";

  const counterDiv = document.createElement("div");
  counterDiv.className = "counter";

  const minusBtn = document.createElement("button");
  minusBtn.textContent = "–";
  minusBtn.onclick = () => decreaseFromCart(id);

  const qtySpan = document.createElement("span");
  qtySpan.id = `qty-${id}`;
  qtySpan.textContent = "1";

  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";
  plusBtn.onclick = () => addToCart(id, itemName(id), itemPrice(id));

  counterDiv.appendChild(minusBtn);
  counterDiv.appendChild(qtySpan);
  counterDiv.appendChild(plusBtn);

  card.appendChild(counterDiv);
}

function toggleCounterToButton(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  const counter = card.querySelector(".counter");
  if (counter) counter.remove();
  const button = card.querySelector("button");
  button.style.display = "inline-block";
}

function updateCartDisplay() {
  const cartList = document.querySelector('.cart-list-container');
  cartList.querySelectorAll('.cart-item').forEach(el => el.remove());

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;

    const qtySpan = document.getElementById(`qty-${item.id}`);
    if (qtySpan) qtySpan.textContent = item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name} - ${item.price} ₽</span>
      <span>Кол-во: ${item.quantity}</span>
      <button onclick="removeFromCart(${item.id})">Удалить</button>
    `;
    cartList.appendChild(itemDiv);
  });

  document.getElementById('cart-count').textContent = cart.length;
  document.getElementById('cart-total').textContent = total + ' ₽';
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  toggleCounterToButton(id);
  updateCartDisplay();
}

function itemName(id) {
  const names = {
    1: 'Смартфон', 2: 'Ноутбук', 3: 'Планшет', 4: 'Телевизор',
    5: 'Наушники', 6: 'Смарт-часы', 7: 'Фотоаппарат',
    8: 'Монитор', 9: 'Колонка', 10: 'Принтер'
  };
  return names[id];
}

function itemPrice(id) {
  const prices = {
    1: 70000, 2: 120000, 3: 40000, 4: 90000,
    5: 10000, 6: 12000, 7: 55000, 8: 25000,
    9: 8000, 10: 15000
  };
  return prices[id];
}

document.querySelector('.order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Заказ создан!');
  cart.length = 0;
  document.querySelectorAll(".counter").forEach(c => c.remove());
  document.querySelectorAll(".product-card button").forEach(b => b.style.display = "inline-block");
  updateCartDisplay();
});

updateCartDisplay();
