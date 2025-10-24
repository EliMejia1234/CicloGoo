# PROCESO DIARIO DE DESARROLLO - PROYECTO CICLOGOO

---

## FASE 1: CicloGoo (Inicio del Desarrollo)

**FECHA:** 2025-10-10 (Fecha de inicio del registro)

**OBJETIVO DEL PROYECTO:**
Desarrollar una aplicación web para el alquiler de bicicletas ("CicloGoo") en hoteles, enfocada en la facilidad de uso y la seguridad, con soporte multi-idioma, y utilizando codigo QR que permitira el acceso a la web. 

**FUNCIONALIDADES PRINCIPALES IMPLEMENTADAS EN ESTA FASE:**

1.  **Registro / Inicio de Sesión:**
    * Permite al usuario ingresar su Nombre, Número de Habitación, Correo Electrónico, Contraseña y Número de Teléfono.
    * Incluye validación exhaustiva de todos los campos (formato de email, número de habitación, longitud del teléfono) antes de avanzar.

2.  **Sistema de Traducción:**
    * Soporte para **cinco (5) idiomas** (Inglés, Español, Alemán, Ruso y Chino).
    * El idioma seleccionado se guarda en la memoria local del navegador (`localStorage`) para persistencia.

3.  **Proceso de Alquiler:**
    * Transición directa desde el Login exitoso a la pantalla de Alquiler (Nota: La validación de seguridad 2FA está en el código, pero actualmente omitida para ir directo al alquiler).
    * El usuario puede ingresar el **ID de la Bicicleta** (con validación de patrón `CGO-XXXX`), seleccionar la **Duración** y el **Método de Pago**.
    * Manejo simulado de éxito de pago con un mensaje temporal de cuenta regresiva (5 segundos).

**ESTADO DEL CÓDIGO (Monolítico):**
Toda la lógica (Traducciones, Validaciones, Login, Alquiler) reside en un único bloque de JavaScript, ejecutado al cargar el DOM.

**TAREAS PENDIENTES CLAVE PARA LA SIGUIENTE FASE:**

1.  Implementar la **Modularización ES6** (Import/Export) para separar las responsabilidades en archivos (`login.js`, `validation.js`, etc.).
2.  Desplegar el flujo completo de **Verificación de Dos Factores (2FA)** antes de permitir el acceso al alquiler.
3.  Implementar la lógica para las futuras pantallas de navegación (`showProfile`, `showHistory`, `showMap`).

---