import CourseCard from "./CourseCard";

// Componente que muestra la lista de cursos filtrados
const CourseList = ({ courses, favorites, onToggleFavorite }) => {
 if (courses.length === 0) {
 return <p className="message">No se encontraron cursos.</p>;
 }

 return (
 <section className="course-list">
 {courses.map((course) => {
 // Verifica si el curso actual está en la lista de favoritos
 const isFavorite = favorites.some((fav) => fav.id === course.id);
 return (
 <CourseCard
 key={course.id}
 course={course}
 isFavorite={isFavorite}
 onToggleFavorite={onToggleFavorite}
 />
 );
 })}
 </section>
 );
};

export default CourseList;
