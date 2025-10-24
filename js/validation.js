export function isValidEmail(email) {
  if (!email) return false;
  const s = String(email).trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(s);
}

export function isValidRoomNumber(roomNumber) {
  if (!roomNumber) return false;
  const s = String(roomNumber).trim();
  const num = parseInt(s, 10);
  return /^\d+$/.test(s) && num >= 1 && num <= 999;
}

export function isValidPhoneNumber(phoneNumber) {
  if (!phoneNumber) return false;
  // Normalizar: quitar caracteres no numéricos
  const digits = String(phoneNumber).replace(/\D/g, '');
  return /^\d{7,15}$/.test(digits);
}

export function isValidBikeId(bikeId) {
    if (!bikeId) return false;
    const normalizedBikeId = bikeId.trim().toUpperCase();
    const bikeIdRegex = /^CGO-\d{4}$/;
    return bikeIdRegex.test(normalizedBikeId);
}