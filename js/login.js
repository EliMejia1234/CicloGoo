import { isValidEmail, isValidRoomNumber, isValidPhoneNumber } from './validation.js';
import { customTranslations } from './i18n.js';
import { start2FA } from './2fa.js'; // Importamos la función que inicia el 2FA

export function handleLogin(event) {
    event.preventDefault();

    // Obtención de DOM y datos
    const nameInput = document.getElementById('name');
    const roomNumberInput = document.getElementById('room-number');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    let loginError = document.getElementById('login-error');
    
    // ... (El resto del código de obtención y limpieza es igual) ...

    const lang = document.getElementById('language')?.value || 'en';
    const currentTranslations = customTranslations[lang] || customTranslations['en'];

    const name = nameInput.value.trim();
    const roomNumber = roomNumberInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const phone = phoneInput.value.trim();

    // limpiar estados
    [nameInput, roomNumberInput, emailInput, passwordInput, phoneInput].forEach(i => i.classList.remove('error'));
    loginError.style.display = 'none';
    loginError.textContent = '';

    // Lógica de Validación (Igual que antes)
    let firstInvalidInput = null;
    // ... (El bloque de `if/else if` de validación aquí) ...

    if (!name) {
        loginError.textContent = currentTranslations['name_required'] || 'Name is required.';
        nameInput.classList.add('error');
        firstInvalidInput = nameInput;
    } else if (!isValidRoomNumber(roomNumber)) {
        loginError.textContent = currentTranslations['invalid_room'] || 'Invalid room';
        roomNumberInput.classList.add('error');
        firstInvalidInput = firstInvalidInput || roomNumberInput;
    } else if (!isValidEmail(email)) {
        loginError.textContent = currentTranslations['invalid_email'] || 'Invalid email';
        emailInput.classList.add('error');
        firstInvalidInput = firstInvalidInput || emailInput;
    } else if (!password) {
        loginError.textContent = currentTranslations['password_required'] || 'Password required';
        passwordInput.classList.add('error');
        firstInvalidInput = firstInvalidInput || passwordInput;
    } else if (!isValidPhoneNumber(phone)) {
        loginError.textContent = currentTranslations['phone_required'] || 'Phone invalid';
        phoneInput.classList.add('error');
        firstInvalidInput = firstInvalidInput || phoneInput;
    }

    if (loginError.textContent) {
        loginError.setAttribute('tabindex', '-1');
        loginError.style.display = 'block';
        if (firstInvalidInput) firstInvalidInput.focus();
        else loginError.focus();
        return;
    }

    // ÉXITO: Iniciamos el flujo 2FA
    const userData = { name, roomNumber, email, phone };
    
    // Limpiar campos después de obtener datos
    [nameInput, roomNumberInput, emailInput, passwordInput, phoneInput].forEach(i => i.value = '');
    
    start2FA(userData); // LLAMA a la función del módulo 2FA
}