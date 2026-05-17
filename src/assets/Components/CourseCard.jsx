import { sanitizeText } from "../utils/sanitize";

// Componente que muestra la información de un curso individual
const CourseCard = ({ course, isFavorite, onToggleFavorite }) => {
 // Se sanitiza el título y la descripción para evitar inyecciones de HTML
 const safeTitle = sanitizeText(course.title);
 const safeDescription = sanitizeText(course.description);

 return (
 <article className="course-card">
 <h2>{safeTitle}</h2>
 <p>{safeDescription}</p>
 <small>Docente ID: {course.teacherId}</small>
 <button
 type="button"
 onClick={() => onToggleFavorite(course)}
 className={isFavorite ? "btn favorite" : "btn"}
 >
 {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
 </button>
 </article>
 );
};

export default CourseCard;
