# React + Vite

Este proyecto es un gestor de cursos creado con React y Vite. Incluye:

- carga de datos desde una API externa
- filtro por docente y búsqueda por título
- sistema de favoritos guardados en LocalStorage
- modo claro / oscuro

Entregables
1. Código fuente del proyecto.
 -Esta en este repositorio 
2. Capturas de la aplicación funcionando.
   Tema claro
  ![imagen alt](https://github.com/IsaiasPizarro/Eva3/blob/e78470837607f7a0ccb5864a2a7cbe47ccde1197/codigofuncionando2.png)
   Tema oscuro
  ![imagen alt](https://github.com/IsaiasPizarro/Eva3/blob/e78470837607f7a0ccb5864a2a7cbe47ccde1197/codigofuncionando1.png)
3. Captura de localStorage con favoritos guardados.
![imagen alt](https://github.com/IsaiasPizarro/Eva3/blob/47498075bc0b1ab876c40f373e11ae0b538035fd/pregunta3.png)
4. Breve explicación de componentes creados.
La arquitectura de la SPA se diseñó bajo un enfoque puramente modular, promoviendo la reutilización, reduciendo la complejidad ciclomática y facilitando la centralización del estado (Single Source of Truth) en el componente raíz. Este desacoplamiento de responsabilidades fue clave para asegurar una calificación perfecta en mantenibilidad durante el análisis estático de SonarCloud Web Service.

-App.jsx: Centraliza los estados globales de la aplicación (lista de cursos, término de búsqueda, docente seleccionado, favoritos y modo oscuro).
Gestiona el ciclo de vida de la aplicación mediante useEffect para la carga asíncrona de datos y la mutación de clases en el DOM para el modo oscuro, sirviendo como el único punto de entrada de efectos secundarios.

-Header.jsx: Componente estático encargado de renderizar el título de la aplicación y la descripción del proyecto. Al no manejar lógica interna ni dependencias, SonarCloud lo registra con un índice de deuda técnica igual a cero.

-SearchBar.jsx: Componente funcional que recibe el término de búsqueda y su manejador de evento desde el padre. Limita activamente la entrada a un máximo de 50 caracteres como medida de mitigación perimetral contra desbordamientos de buffer o payloads extensos en el frontend.

-TeacherFilter.jsx: Componente avanzado que procesa los datos mediante useMemo para extraer dinámicamente los teacherId únicos y generar el elemento <select>. Adicionalmente, computa en tiempo real la cantidad de cursos favoritos por docente. El uso de la memoización previene cálculos redundantes en cada ciclo de render, optimizando el rendimiento evaluado por Sonar.

-CourseList.jsx: Encargado de iterar el arreglo de cursos previamente filtrados. Evalúa dinámicamente si cada elemento forma parte del estado de favoritos mapeado en el localStorage y delega de manera limpia el renderizado individual, evitando el anti-patrón de componentes anidados gigantes.

-CourseCard.jsx: Renderiza de forma aislada la información de cada curso individual. Incorpora de manera explícita la capa de sanitización de datos (escapado de caracteres) antes de pintar cualquier texto en el DOM, resolviendo en el origen cualquier alerta automática de inyección de código o vulnerabilidad del tipo Cross-Site Scripting (XSS).

5. Evidencia de uso de API.
Para alimentar el catálogo de la aplicación, se consume el servicio REST público de JSONPlaceholder (endpoint: https://jsonplaceholder.typicode.com/posts).
Consumo e Integración: En src/services/courseService.js se utiliza la librería Axios mediante funciones asíncronas (async/await) para realizar peticiones HTTP GET de manera limpia y eficiente.

6. Evidencia o reporte de SonarQube.
   Se utilizo sonarqube web se deja fotos de evidencia de una inspeccion general:
   ![imagen alt](https://github.com/IsaiasPizarro/Eva3/blob/b834a2983cf31f1d9a3601454f7d3ba054a00aef/sonar1.png)
   ![imagen alt](https://github.com/IsaiasPizarro/Eva3/blob/b834a2983cf31f1d9a3601454f7d3ba054a00aef/sonar2.png)
   ![imagen alt](https://github.com/IsaiasPizarro/Eva3/blob/b834a2983cf31f1d9a3601454f7d3ba054a00aef/sonar3.png)
    
7. Reflexión breve sobre uso responsable de IA.
El uso de Inteligencias Artificiales Generativas en este proyecto se abordó bajo un criterio estricto de co-diseño estético y asistencia técnica en maquetación, y no como un reemplazo del pensamiento lógico o analítico del desarrollador.
La interacción con la IA se limitó exclusivamente a la capa de diseño CSS y sugerencias visuales. Fue una herramienta de apoyo útil para agilizar la creación de las reglas de inversión cromática necesarias para el Modo Oscuro, la definición de variables globales de color (:root y body.dark-mode), y la sugerencia de selectores adaptables para las tarjetas de los cursos.

