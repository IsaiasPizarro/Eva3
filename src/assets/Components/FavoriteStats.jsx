// Componente que muestra las estadísticas de favoritos por docente
const FavoriteStats = ({ stats }) => {
 if (!stats.length) {
 // No renderiza nada si no hay datos para mostrar
 return null;
 }

 return (
 <section className="favorite-stats">
 <h2>Favoritos por docente</h2>
 <div className="stats-list">
 {stats.map(({ teacherId, count }) => (
 <span key={teacherId} className="stat-chip">
 Docente {teacherId}: {count}
 </span>
 ))}
 </div>
 </section>
 );
};

export default FavoriteStats;
