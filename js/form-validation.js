// js/form-validation.js
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    
    // Validaciones
    if (!nombre || nombre.length > 50) {
      showError('nombre', 'Nombre requerido (máx 50 caracteres)');
      return;
    }
    
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      showError('email', 'Email inválido');
      return;
    }
    
    if (telefono && !/^[0-9]{10}$/.test(telefono)) {
      showError('telefono', 'Teléfono debe tener 10 dígitos');
      return;
    }
    
    // Enviar formulario si pasa validaciones
    console.log('Formulario válido, enviando...');
  });
  
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = 'red';
    
    let errorElement = document.getElementById(`${fieldId}-error`);
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = `${fieldId}-error`;
      errorElement.className = 'error-message';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }