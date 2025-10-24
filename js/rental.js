import { isValidBikeId } from './validation.js';
import { customTranslations } from './i18n.js';
import { showSection } from './2fa.js'; // Usamos showSection del módulo 2FA

let countdownTimer = null; // Para manejar el temporizador de pago

// Esta función es llamada cuando el formulario de alquiler es enviado.
export function handleRentalFormSubmit(event) {
  // Previene el envío por defecto del formulario (solo si hay evento)
  if (event) {
    event.preventDefault();
  }

  // Obtención de DOM y datos
  const bikeIdInput = document.getElementById('bike-id');
  const durationSelect = document.getElementById('rental-duration');
  const paymentSelect = document.getElementById('payment-method');
  let formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');
  const rentalForm = document.getElementById('rental-form');

  if (!bikeIdInput || !durationSelect || !paymentSelect || !formSuccess || !rentalForm) {
    console.error("Faltan elementos DOM para handleRentalFormSubmit.");
    return;
  }
  
  // Limpiar/crear formError si no existe
  if (!formError) {
    formError = rentalForm.querySelector('#form-error') || document.createElement('p');
    formError.id = 'form-error';
    formError.className = 'error'; 
    rentalForm.prepend(formError);
  }

  const lang = document.getElementById('language')?.value || 'en';
  const currentTranslations = customTranslations[lang] || customTranslations['en'];

  const bikeId = bikeIdInput.value.trim();
  const duration = durationSelect.value;
  const paymentMethod = paymentSelect.value;

  // Limpiar estados
  [bikeIdInput, durationSelect, paymentSelect].forEach(i => i.classList.remove('error'));
  formError.style.display = 'none';
  formError.textContent = '';
  formSuccess.style.display = 'none';

  // Validar campos
  let firstInvalidInput = null;
  if (!bikeId || !isValidBikeId(bikeId)) { 
    formError.textContent = currentTranslations['bike_id_required'] || 'Invalid bike ID';
    bikeIdInput.classList.add('error');
    firstInvalidInput = bikeIdInput;
  } else if (!duration) {
    formError.textContent = currentTranslations['duration_required'] || 'Select duration';
    durationSelect.classList.add('error');
    firstInvalidInput = firstInvalidInput || durationSelect;
  } else if (!paymentMethod) {
    formError.textContent = currentTranslations['payment_required'] || 'Select payment method';
    paymentSelect.classList.add('error');
    firstInvalidInput = firstInvalidInput || paymentSelect;
  }

  // Si hay errores, mostrar mensaje y enfocar input
  if (formError.textContent) {
    formError.style.display = 'block';
    if (firstInvalidInput) firstInvalidInput.focus();
    return;
  }

  // --- LÓGICA DE PAGO SIMULADO (ÉXITO) ---
  
  // Detener cualquier temporizador anterior
  if (countdownTimer) {
      clearInterval(countdownTimer);
  }
  
  // Deshabilitar botón para evitar múltiples envíos
  const submitBtn = rentalForm.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  let timeLeft = 5;
  formSuccess.textContent = `${currentTranslations['form_success'] || 'Success'} (${timeLeft}s)`;
  formSuccess.style.display = 'block';

  // Iniciar temporizador de cuenta regresiva
  countdownTimer = setInterval(() => {
    timeLeft--;
    formSuccess.textContent = `${currentTranslations['form_success'] || 'Success'} (${timeLeft}s)`;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      
      // Resetear la interfaz
      formSuccess.style.display = 'none';
      bikeIdInput.value = '';
      durationSelect.value = '';
      paymentSelect.value = '';
      if (submitBtn) submitBtn.disabled = false;
      
      // Opcional: Volver a la pantalla de login después de un alquiler exitoso
      // showSection('login-section'); 
    }
  }, 1000);
}

// Función simple para que el módulo 2fa pueda llamar al flujo (aunque no haga nada más que mostrar la sección)
export function handleRental() {
    showSection('rental-section');
}