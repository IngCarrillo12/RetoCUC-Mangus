import React, { useEffect, useState } from 'react';
import '../style/CourseDetail.css';
import { CardCourse } from './CardCourse.jsx';
import { FormCreate } from './formCreate';
import {FeedbackCards} from '../components/FeedbackCards.jsx'
import { FeedbackResponse } from './FeedbackResponse.jsx';
import { useAuthStore } from '../store/AuthStore.jsx';

export const CourseDetail = ({ course }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(course); 
  const { user } = useAuthStore(); 

  useEffect(() => {
    setCurrentCourse(course); 
  }, [course]);

  const totalLecciones = currentCourse.unidades.reduce((sum, unidad) => {
    return sum + unidad.lecciones.length;
  }, 0);

  const handleEditClick = () => {
    setIsEditing(true); // Activa el modo de edición
  };

  const handleCloseForm = async (updatedCourse) => {
    setCurrentCourse(updatedCourse) 
    setIsEditing(false);
  };

  return (
    <div className="course-detail">
      {
        !isEditing?(
          <div className="course-container">
            <div className="coursedetail-card">
        <CardCourse
          title={currentCourse.titulo}
          description={currentCourse.descripcion_larga}
          estado={currentCourse.estado}
          lecciones={totalLecciones}
          duracion={currentCourse.duracion}
          unidades={currentCourse.unidades.length}
        />
        <button className="edit-button" onClick={handleEditClick}>
          Editar
        </button>
      </div>
      {
        user?.rol ==='docente'?
        <FeedbackCards cursoId={course?.id}/>
        :
        <FeedbackResponse cursoId={course?.id} adminId={user?.id}/>
      }
   
          </div>
        
        ):(
          <div className="form-modal">
          <button className="close-button" onClick={()=>setIsEditing(false)}>
            Cerrar
          </button>
          <FormCreate
            courseData={currentCourse} // Pasa los datos del curso al formulario para que sean editables
            onSubmitAction={async (updatedCourse) => {
              if (updatedCourse) {
                handleCloseForm(updatedCourse);
              }
            }}
          />
        </div>
        )
      }
      

     
        

    </div>
  );
};
