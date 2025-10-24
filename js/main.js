import { changeLanguage } from './i18n.js';
import { handleLogin } from './login.js';
import { handle2FAVerification } from './2fa.js';
import { handleRentalFormSubmit } from './rental.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización del idioma y Event Listener
    const langSelector = document.getElementById('language');
    if (langSelector) {
        changeLanguage();
        langSelector.addEventListener('change', (e) => changeLanguage(e.target.value));
    } else {
        changeLanguage();
    }
    
    // 2. Vinculación de formularios
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // NUEVO: Vinculación del formulario 2FA
    const twofaForm = document.getElementById('twofa-form');
    if (twofaForm) twofaForm.addEventListener('submit', handle2FAVerification);
    
    // Vinculación del formulario de alquiler (usa la nueva función)
    const rentalForm = document.getElementById('rental-form');
    if (rentalForm) rentalForm.addEventListener('submit', handleRentalFormSubmit);
});