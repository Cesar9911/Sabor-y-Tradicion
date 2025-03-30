// Efecto de scroll suave para la navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Efecto de hover en los cuadros de Misión/Visión
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  });
});

/**********************
 * MENÚ DE IDIOMAS MEJORADO
 **********************/
const languageBtn = document.querySelector('.language-btn');
const languageDropdown = document.querySelector('.language-dropdown');

// Cambiar idioma y almacenar preferencia
document.querySelectorAll('.language-dropdown a').forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = e.target.dataset.lang;
    languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${lang.toUpperCase()}`;
    languageDropdown.classList.remove('show');
    localStorage.setItem('preferredLang', lang);
    
    // Aquí iría la lógica para cambiar los textos de la página
    console.log(`Idioma cambiado a: ${lang}`);
  });
});

// Mostrar/ocultar dropdown
languageBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  languageDropdown.classList.toggle('show');
});

// Cerrar al hacer clic fuera
document.addEventListener('click', () => {
  languageDropdown.classList.remove('show');
});

// Cargar idioma preferido al iniciar
const preferredLang = localStorage.getItem('preferredLang') || 'es';
languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${preferredLang.toUpperCase()}`;

/**********************
 * BARRA DE BÚSQUEDA CON FIREBASE
 **********************/
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

searchBtn.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    try {
      // Esta función necesitaría importar Firebase
      const results = await searchInFirebase(searchTerm);
      displaySearchResults(results);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      showError("Error al realizar la búsqueda");
    }
  }
});

// Función simulada (debes implementar la conexión real con Firebase)
async function searchInFirebase(term) {
  console.log("Buscando en Firebase:", term);
  // Implementación real necesitaría:
  // import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
  return []; // Retorna resultados simulados
}

/**********************
 * CARRITO DE COMPRAS
 **********************/
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Ejemplo de añadir al carrito (debes conectar con tus botones)
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price)
    };
    addToCart(product);
  });
});

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

/**********************
 * VALIDACIÓN DE FORMULARIOS MEJORADA
 **********************/
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const form = e.target;
  const email = form.email.value;
  const phone = form.telefono.value;
  let isValid = true;

  // Resetear errores
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

  // Validar email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(form.email, 'Ingrese un email válido');
    isValid = false;
  }

  // Validar teléfono (si existe)
  if (phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) {
    showError(form.telefono, 'Teléfono inválido');
    isValid = false;
  }

  if (isValid) {
    // Aquí iría el envío a Firebase
    console.log('Formulario válido, enviando...');
    form.reset();
    showSuccess('Formulario enviado con éxito');
  }
});

function showError(field, message) {
  field.classList.add('is-invalid');
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message text-danger mt-1';
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

function showSuccess(message) {
  // Implementar notificación de éxito
  alert(message); // Puedes reemplazar con un toast o modal
}

/**********************
 * INICIALIZACIÓN
 **********************/
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI(); // Actualizar contador del carrito al cargar
  
  // Verificar si hay usuario logueado (Firebase Auth)
  if (localStorage.getItem('user')) {
    // Cargar carrito desde Firebase si está autenticado
  }
});