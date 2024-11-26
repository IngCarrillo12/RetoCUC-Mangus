import React from 'react'
import { Timeline } from './TimeLine'
import '../style/CourseDetail.css'
import { CardCourse } from './CardCourse';
export const CourseDetail = ({course}) => {
    const totalLecciones = course.unidades.reduce((sum, unidad) => {
        return sum + unidad.lecciones.length;
      }, 0); 
  return (
    <div className="courses-grid">
    <CardCourse title={course.titulo} description={course.descripcion_larga} estado={course.estado} lecciones={totalLecciones} duracion={course.duracion} unidades={course.unidades.length}/>
      
        </div>
          // <div className='courseDetail'>
        //     <div className='courseDetail-header'>
        //         <h1>{course.titulo}</h1>
        //         <p>{course.descripcion_larga}</p>
        //     </div>
        //     <div className='courseDetail-stat'>
        //         <ul className='stat-info'>
        //             <li><b>Duracion:</b> {course.duracion} Min</li>
        //             <li><b>Unidades:</b> {course.unidades.length}</li>
        //             <li><b>Lecciones</b> {totalLecciones}</li>
        //         </ul>
        //         <Timeline estado={course.estado}/>
        //     </div>
        // </div>
  )
}
