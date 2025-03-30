// js/cart.js
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { db } from './firebase-config.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  // Actualizar interfaz
}

// Añadir al carrito
function addToCart(item) {
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
}

// Guardar en Firebase al finalizar compra
async function checkout(userId) {
  const cartRef = doc(db, "carts", userId);
  await setDoc(cartRef, { items: cart, timestamp: new Date() });
  cart = [];
  updateCart();
}