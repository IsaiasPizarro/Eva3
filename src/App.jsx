import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./assets/Components/Header";
import SearchBar from "./assets/Components/SearchBar";
import CourseList from "./assets/Components/CourseList";
import TeacherFilter from "./assets/Components/TeacherFilter";
import FavoriteStats from "./assets/Components/FavoriteStats";
import ThemeToggle from "./assets/Components/ThemeToggle";
import { getCourses } from "./assets/Services/courseService";
import { useLocalStorage } from "./Hooks/userLocalStorage";

// Componente principal de la aplicación.
// Aquí se administra la carga de cursos, el filtro, los favoritos y el tema.
function App() {
 // Estados principales de la aplicación
 const [courses, setCourses] = useState([]); // cursos obtenidos de la API
 const [searchTerm, setSearchTerm] = useState(""); // texto de búsqueda ingresado por el usuario
 const [selectedTeacher, setSelectedTeacher] = useState("Todos"); // docente seleccionado en el filtro
 const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []); // favoritos guardados localmente
 const [theme, setTheme] = useLocalStorage("theme", "light"); // tema de la interfaz
 const [loading, setLoading] = useState(true); // indicador de carga de datos
 const [error, setError] = useState(""); // mensaje en caso de error al cargar datos

 // Carga los cursos desde el servicio remoto
 const loadCourses = async () => {
 try {
 setLoading(true);
 setError("");
 const data = await getCourses();
 setCourses(data);
 } catch (error) {
 setError(error.message || "Ocurrió un error inesperado.");
 } finally {
 setLoading(false);
 }
 };

 // Ejecuta la carga una sola vez cuando el componente se monta
 useEffect(() => {
 loadCourses();
 }, []);

 // Construye un arreglo único de IDs de docentes a partir de los cursos cargados
 const teacherIds = useMemo(() => {
 return Array.from(new Set(courses.map((course) => course.teacherId))).sort(
 (a, b) => a - b
 );
 }, [courses]);

 // Filtra los cursos por el término de búsqueda y por docente seleccionado
 const filteredCourses = useMemo(() => {
 const normalizedSearch = searchTerm.toLowerCase().trim();
 return courses.filter((course) => {
 const matchesSearch = course.title
 .toLowerCase()
 .includes(normalizedSearch);
 const matchesTeacher =
 selectedTeacher === "Todos" ||
 course.teacherId.toString() === selectedTeacher;
 return matchesSearch && matchesTeacher;
 });
 }, [courses, searchTerm, selectedTeacher]);

 // Calcula la cantidad de cursos favoritos por cada docente
 const favoritesByTeacher = useMemo(() => {
 return teacherIds.map((teacherId) => ({
 teacherId,
 count: favorites.filter((fav) => fav.teacherId === teacherId).length,
 }));
 }, [favorites, teacherIds]);

 // Maneja la adición o eliminación de favoritos
 const handleToggleFavorite = (course) => {
 const exists = favorites.some((fav) => fav.id === course.id);
 if (exists) {
 const updatedFavorites = favorites.filter((fav) => fav.id !== course.id);
 setFavorites(updatedFavorites);
 return;
 }
 setFavorites([...favorites, course]);
 };

 // Alterna el tema de la aplicación entre claro y oscuro
 const handleThemeToggle = () => {
 setTheme((current) => (current === "dark" ? "light" : "dark"));
 };

 // Aplica la clase CSS de modo oscuro cuando el tema cambia
 useEffect(() => {
 document.body.classList.toggle("dark-mode", theme === "dark");
 }, [theme]);

 return (
 <main className="app">
 <Header />
 <div className="header-actions">
 <ThemeToggle theme={theme} onToggleTheme={handleThemeToggle} />
 </div>
 <section className="summary">
 <p>Total de cursos: {courses.length}</p>
 <p>Favoritos: {favorites.length}</p>
 </section>
 <FavoriteStats stats={favoritesByTeacher} />
 <div className="controls">
 <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
 <TeacherFilter
 teacherIds={teacherIds}
 selectedTeacher={selectedTeacher}
 onSelectTeacher={setSelectedTeacher}
 />
 </div>
 {loading && <p className="message">Cargando cursos...</p>}
 {error && (
 <div className="error">
 <p>{error}</p>
 <button type="button" onClick={loadCourses}>
 Reintentar
 </button>
 </div>
 )}
 {!loading && !error && (
 <CourseList
 courses={filteredCourses}
 favorites={favorites}
 onToggleFavorite={handleToggleFavorite}
 />
 )}
 </main>
 );
}
export default App;