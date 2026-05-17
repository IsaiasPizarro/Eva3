// Botón que permite cambiar el tema entre claro y oscuro
const ThemeToggle = ({ theme, onToggleTheme }) => {
 return (
 <button type="button" className="theme-toggle-btn" onClick={onToggleTheme}>
 {theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
 </button>
 );
};

export default ThemeToggle;
