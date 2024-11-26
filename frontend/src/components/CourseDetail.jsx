import React, { useState } from 'react';
import { Timeline } from './TimeLine';
import '../style/CourseDetail.css';
import { CardCourse } from './CardCourse.jsx';
import { FormCreate } from './formCreate';

export const CourseDetail = ({ course }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para mostrar/ocultar el formulario de edición

  const totalLecciones = course.unidades.reduce((sum, unidad) => {
    return sum + unidad.lecciones.length;
  }, 0);

  const handleEditClick = () => {
    setIsEditing(true); // Activa el modo de edición
  };

  const handleCloseForm = () => {
    setIsEditing(false); // Cierra el formulario de edición
  };

  return (
    <div className="course-detail">
      <div className="course-header">
        <CardCourse
          title={course.titulo}
          description={course.descripcion_larga}
          estado={course.estado}
          lecciones={totalLecciones}
          duracion={course.duracion}
          unidades={course.unidades.length}
        />
        <button className="edit-button" onClick={handleEditClick}>
          Editar
        </button>
      </div>

      {isEditing && (
        <div className="form-modal">
          <button className="close-button" onClick={handleCloseForm}>
            Cerrar
          </button>
          <FormCreate
            courseData={course} // Pasa los datos del curso al formulario para que sean editables
            onSubmitAction={(updatedCourse) => {
              console.log('Curso actualizado:', updatedCourse);
              handleCloseForm(); // Cierra el formulario después de actualizar
            }}
          />
        </div>
      )}
    </div>
  );
};
