// 1. Datos de Traducción
export const customTranslations = {
  // Aquí va TODO el objeto customTranslations que tienes en app.js
  en: {
    title: "CicloGoo", subtitle: "Easy and Fast Bicycle Rental in Miami",
    login_title: "Sign In", name_label: "Name", name_placeholder: "Enter your name",
    room_label: "Room Number", room_placeholder: "Enter your room number (e.g., 101)",
    email_label: "Email", email_placeholder: "Enter your email",
    password_label: "Password", password_placeholder: "Enter your password",
    phone_label: "Phone Number", phone_placeholder: "Enter your phone (e.g., 1234567890)",
    login_button: "Sign In", rental_title: "Bicycle Rental",
    bike_id_label: "Bicycle ID (Scan QR Code)", bike_id_placeholder: "Scan the QR code (e.g., CGO-1234)",
    duration_label: "Rental Duration", select_duration: "Select duration",
    "1_hour": "1 hour", "2_hours": "2 hours", "4_hours": "4 hours", full_day: "Full day",
    payment_label: "Payment Method", select_payment: "Select payment method",
    credit_card: "Credit Card", debit_card: "Debit Card", paypal: "PayPal",
    rental_button: "Confirm Rental",
    footer: "© 2025 CicloGoo. All rights reserved.",
    name_required: "Name is required.",
    invalid_room: "Invalid room number. Must be digits only (1-999).",
    invalid_email: "Invalid email format. Please check your address.",
    password_required: "Password is required.",
    phone_required: "Phone is required. Must be 7-15 digits.",
    bike_id_required: "Bicycle ID is required and must follow the pattern CGO-XXXX.",
    duration_required: "Please select a rental duration.",
    payment_required: "Please select a payment method.",
    form_success: "Payment validated! Bicycle unlocked. Enjoy your ride!",
    // --- Nuevo para 2FA ---
    twofa_title: "Two-Factor Verification",
    code_label: "Enter 6-digit Code",
    code_placeholder: "######",
    twofa_button: "Verify Code",
    twofa_resend: "Resend Code",
    twofa_expired: "Code expired or invalid. Please try again.",
  },
  es: {
    // Aquí va TODO el objeto 'es'
    title: "CicloGoo", subtitle: "Alquiler de bicicletas fácil y rápido en Miami",
    login_title: "Iniciar Sesión", name_label: "Nombre", name_placeholder: "Introduce tu nombre",
    room_label: "Número de Habitación", room_placeholder: "Introduce el número de tu habitación (ej: 101)",
    email_label: "Correo Electrónico", email_placeholder: "Introduce tu correo electrónico",
    password_label: "Contraseña", password_placeholder: "Ingresa tu contraseña",
    phone_label: "Número de Teléfono", phone_placeholder: "Introduce tu número de teléfono (ej: 1234567890)",
    login_button: "Iniciar Sesión", rental_title: "Alquiler de Bicicleta",
    bike_id_label: "ID de la Bicicleta (Escanea el QR)", bike_id_placeholder: "Escanea el código QR (ej: CGO-1234)",
    duration_label: "Duración del Alquiler", select_duration: "Selecciona duración",
    "1_hour": "1 hora", "2_hours": "2 horas", "4_hours": "4 horas", full_day: "Todo el día",
    payment_label: "Método de Pago", select_payment: "Selecciona método de pago",
    credit_card: "Tarjeta de Crédito", debit_card: "Tarjeta de Débito", paypal: "PayPal",
    rental_button: "Confirmar Alquiler",
    footer: "© 2025 CicloGoo. Todos los derechos reservados.",
    name_required: "El nombre es obligatorio.",
    invalid_room: "Número de habitación inválido. Debe ser solo dígitos (1-999).",
    invalid_email: "Formato de correo inválido. Por favor, verifica tu dirección.",
    password_required: "La contraseña es obligatoria.",
    phone_required: "El número de teléfono es obligatorio. Debe tener 7-15 dígitos.",
    bike_id_required: "Se requiere el ID de Bicicleta y debe seguir el patrón CGO-XXXX.",
    duration_required: "Por favor, selecciona una duración de alquiler.",
    payment_required: "Por favor, selecciona un método de pago.",
    form_success: "¡Pago validado! Bicicleta desbloqueada. ¡Disfruta tu paseo!",
    // --- Nuevo para 2FA ---
    twofa_title: "Verificación de Dos Factores",
    code_label: "Introduce Código de 6 dígitos",
    code_placeholder: "######",
    twofa_button: "Verificar Código",
    twofa_resend: "Reenviar Código",
    twofa_expired: "Código expirado o inválido. Intenta de nuevo.",
  },
  // Agregar más idiomas aquí
};

export function getTranslation(key, lang = null) {
    const language = lang || document.getElementById('language')?.value || 'en';
    return customTranslations[language]?.[key] ?? customTranslations['en']?.[key] ?? '';
}

export function changeLanguage(forcedLang = null) {
  const langSelector = document.getElementById('language');
  let lang = forcedLang || langSelector?.value || 'en';

  if (!forcedLang && localStorage.getItem('language')) {
    lang = localStorage.getItem('language');
    if (langSelector) langSelector.value = lang;
  }

  const currentTranslations = customTranslations[lang] || customTranslations['en'] || {};
  localStorage.setItem('language', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = currentTranslations[key] ?? '';

    // 1. Lógica para establecer texto
    if (['BUTTON', 'P', 'H1', 'H2', 'OPTION'].includes(el.tagName)) {
        el.textContent = text;
    } else if (el.tagName === 'INPUT' && el.type === 'submit') {
        el.value = text;
    } else if (el.tagName === 'LABEL') {
        el.textContent = text;
    }
    
    // 2. Lógica para establecer placeholder
    let inputElement = null;
    if (el.tagName === 'LABEL' && el.htmlFor) {
        inputElement = document.getElementById(el.htmlFor);
    } else if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        inputElement = el;
    }

    if (inputElement) {
        const baseKey = key.replace('_label', '');
        const placeholderKey = `${baseKey}_placeholder`;
        const placeholderText = currentTranslations[placeholderKey] ?? '';

        if (placeholderText) {
            inputElement.placeholder = placeholderText;
        }
    }
  });

  const footerP = document.querySelector('footer p');
  if (footerP) footerP.textContent = currentTranslations['footer'] ?? footerP.textContent;
}