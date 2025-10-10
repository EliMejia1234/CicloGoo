// Encapsula todo el código en un IIFE para evitar contaminación del ámbito global
(function() {
    // Definición de traducciones
    const translations = {
        en: {
            title: "CicloGoo", subtitle: "Easy and Fast Bicycle Rental in Miami",
            login_title: "Sign In", name_label: "Name", name_placeholder: "Enter your name",
            room_label: "Room Number", room_placeholder: "Enter your room number (e.g., 101)",
            email_label: "Email", email_placeholder: "Enter your email",
            password_label: "Password", password_placeholder: "Enter your password",
            phone_label: "Phone Number", phone_placeholder: "Enter your phone number (e.g., 1234567890)",
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
            phone_required: "Phone number is required. Must be 7-15 digits.",
            bike_id_required: "Bicycle ID is required and must follow the pattern CGO-XXXX.",
            duration_required: "Please select a rental duration.",
            payment_required: "Please select a payment method.",
            form_success: "Payment validated! Bicycle unlocked. Enjoy your ride!"
        },
        es: {
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
            form_success: "¡Pago validado! Bicicleta desbloqueada. ¡Disfruta tu paseo!"
        }
        // Agrega otros idiomas (de, ru, zh) si los necesitas
    };

    // Funciones de validación
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidRoomNumber(roomNumber) {
        const roomNumberRegex = /^\d+$/;
        const num = parseInt(roomNumber, 10);
        return roomNumberRegex.test(roomNumber.trim()) && num >= 1 && num <= 999;
    }

    function isValidPhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{7,15}$/;
        console.log("Validando teléfono:", phoneNumber, "Resultado:", phoneRegex.test(phoneNumber.trim()));
        return phoneRegex.test(phoneNumber.trim());
    }

    // Función de traducción
    function changeLanguage() {
        const langSelector = document.getElementById('language');
        const lang = langSelector ? langSelector.value : 'en';
        const currentTranslations = translations[lang] || translations['en'];
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = currentTranslations[key];
            if (text) {
                if (['BUTTON', 'P', 'H1', 'H2', 'OPTION'].includes(element.tagName)) {
                    element.textContent = text;
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = text;
                } else if (element.tagName === 'LABEL') {
                    element.textContent = text;
                }
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    const placeholderKey = `${key}_placeholder`;
                    const placeholderText = currentTranslations[placeholderKey];
                    if (placeholderText) element.placeholder = placeholderText;
                }
            }
        });

        const footerElement = document.querySelector('footer p');
        if (footerElement) footerElement.textContent = currentTranslations['footer'];
    }

    // Función de login
    function handleLogin(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const roomNumberInput = document.getElementById('room-number');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const phoneInput = document.getElementById('phone');
        const loginError = document.getElementById('login-error');
        const loginSection = document.getElementById('login-section');
        const rentalSection = document.getElementById('rental-section');

        if (!nameInput || !roomNumberInput || !emailInput || !passwordInput || !phoneInput || !loginError || !loginSection || !rentalSection) {
            console.error("Faltan elementos DOM para la función handleLogin.");
            return;
        }

        const langSelector = document.getElementById('language');
        const lang = langSelector ? langSelector.value : 'en';
        if (!langSelector) {
            console.warn("Elemento #language no encontrado en handleLogin. Usando idioma por defecto: 'en'.");
        }
        const currentTranslations = translations[lang] || translations['en'];
        
        const name = nameInput.value.trim();
        const roomNumber = roomNumberInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const phone = phoneInput.value.trim();
        
        nameInput.classList.remove('error');
        roomNumberInput.classList.remove('error');
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        phoneInput.classList.remove('error');

        loginError.style.display = 'none';
        loginError.textContent = '';

        let firstInvalidInput = null;
        if (!name) {
            loginError.textContent = currentTranslations['name_required'];
            nameInput.classList.add('error');
            firstInvalidInput = nameInput;
        } else if (!roomNumber || !isValidRoomNumber(roomNumber)) {
            loginError.textContent = currentTranslations['invalid_room'];
            roomNumberInput.classList.add('error');
            firstInvalidInput = firstInvalidInput || roomNumberInput;
        } else if (!email || !isValidEmail(email)) {
            loginError.textContent = currentTranslations['invalid_email'];
            emailInput.classList.add('error');
            firstInvalidInput = firstInvalidInput || emailInput;
        } else if (!password) {
            loginError.textContent = currentTranslations['password_required'];
            passwordInput.classList.add('error');
            firstInvalidInput = firstInvalidInput || passwordInput;
        } else if (!phone || !isValidPhoneNumber(phone)) {
            loginError.textContent = currentTranslations['phone_required'];
            phoneInput.classList.add('error');
            firstInvalidInput = firstInvalidInput || phoneInput;
        }
        
        if (loginError.textContent !== "") {
            loginError.setAttribute('tabindex', '0');
            loginError.setAttribute('aria-live', 'polite');
            loginError.style.display = 'block';
            if (firstInvalidInput) {
                firstInvalidInput.focus();
            } else {
                loginError.focus();
            }
            return;
        }

        loginSection.style.display = 'none';
        rentalSection.style.display = 'block';

        nameInput.value = '';
        roomNumberInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        phoneInput.value = '';
    }

    // Vinculación de eventos al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            languageSelector.addEventListener('change', changeLanguage);
            changeLanguage(); // Inicializa el idioma al cargar
        }
    });
})();