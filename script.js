// Detectar preferencia del sistema
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Obtener elementos
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Función segura para leer de localStorage
function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    console.warn("localStorage no disponible. Usando preferencia del sistema.");
    return null;
  }
}

// Función segura para guardar en localStorage
function setStoredTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    console.warn("No se pudo guardar en localStorage:", e);
  }
}

// Aplicar tema
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  setStoredTheme(theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Cargar tema
const savedTheme = getStoredTheme();
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(prefersDarkScheme.matches ? "dark" : "light");
}

// Cambiar tema al hacer clic
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
}

// Escuchar cambios en preferencia del sistema
prefersDarkScheme.addEventListener("change", (e) => {
  if (!getStoredTheme()) {
    applyTheme(e.matches ? "dark" : "light");
  }
});
