import { getTranslation } from './i18n.js';
import { handleRental } from './rental.js';

// Código de prueba fijo para 2FA.
// Se usa un número simple y constante para que las pruebas sean predecibles.
const TEST_CODE = '123456'; 
let generatedCode = TEST_CODE; // Inicializamos con el código fijo

function generateCode() {
    // Para pruebas, el código es FIJO.
    // generatedCode se actualiza solo para mantener la consistencia con la variable global, 
    // pero siempre será el valor de TEST_CODE.
    generatedCode = TEST_CODE; 
    console.log(`[2FA] Código generado (FIJO PARA PRUEBAS): ${generatedCode}`); 
    return generatedCode;
}

// Controla la visibilidad de las secciones
export function showSection(sectionId) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('twofa-section').style.display = 'none';
    document.getElementById('rental-section').style.display = 'none';

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

export function start2FA(userData) {
    generateCode();
    showSection('twofa-section');

    // Puedes guardar los datos del usuario temporalmente
    localStorage.setItem('tempUserData', JSON.stringify(userData));
}

export function handle2FAVerification(event) {
    event.preventDefault();

    const codeInput = document.getElementById('verification-code');
    const twofaError = document.getElementById('twofa-error');
    const enteredCode = codeInput.value.trim();
    
    // Limpiar errores
    if (twofaError) {
        twofaError.style.display = 'none';
        twofaError.textContent = '';
    }

    if (enteredCode === generatedCode) {
        console.log("2FA Exitoso. Accediendo a Alquiler.");
        // Aquí pasamos al módulo de alquiler
        handleRental(null); 
    } else {
        // En el código original, el error era 'twofa_expired'. 
        // Lo cambié a 'twofa_error' para que sea más genérico para la verificación.
        twofaError.textContent = getTranslation('twofa_error'); 
        if (twofaError) twofaError.style.display = 'block';
        codeInput.classList.add('error');
    }
}