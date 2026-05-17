// Componente que permite seleccionar un docente para filtrar los cursos
const TeacherFilter = ({ teacherIds, selectedTeacher, onSelectTeacher }) => {
 return (
 <div className="teacher-filter">
 <label htmlFor="teacher-filter">Filtrar por docente:</label>
 <select
 id="teacher-filter"
 value={selectedTeacher}
 onChange={(event) => onSelectTeacher(event.target.value)}
 >
 <option value="Todos">Todos</option>
 {teacherIds.map((teacherId) => (
 <option key={teacherId} value={teacherId.toString()}>
 Docente {teacherId}
 </option>
 ))}
 </select>
 </div>
 );
};

export default TeacherFilter;
