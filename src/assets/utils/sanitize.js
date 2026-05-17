// Función de seguridad para sanear texto antes de mostrarlo en la UI
// Evita que etiquetas HTML se interpreten como código peligroso.
export const sanitizeText = (text) => {
 if (typeof text !== "string") return "";
 return text
 .replace(/</g, "&lt;")
 .replace(/>/g, "&gt;")
 .trim();
};
