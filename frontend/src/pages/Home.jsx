
import '../style/home.css'
import React, { useEffect, useState, useRef } from "react";
import { Header } from "../components/header.jsx";
import { CardCourse } from '../components/CardCourse.jsx';
import { GraphicTort } from '../components/GraphicTort.jsx';
import { GraphicBar } from '../components/GraphicBar.jsx';
import { MenuHome } from "../components/MenuHome.jsx";
import {FormCreate} from '../components/FormCreate.jsx';
import { SearchBar } from "../components/SearchBar.jsx";
import { useCourseStore } from '../store/CourseStore.jsx';
import { CourseDetail } from '../components/CourseDetail.jsx';
import {Mosaic} from 'react-loading-indicators'
import BarChartExample from '../components/GraphicResource.jsx';
import { useAuthStore } from "../store/AuthStore.jsx"; 
import {TitleTyping} from '../components/TitleTyping.jsx'
import sensorImg from '../img/sensor.png';

export const Home= () => {
  const { user, logout } = useAuthStore(); 
  const { loadCourses, loading, error,courses } = useCourseStore() 
  const [Courses, setCourses] = useState(false)
  const [Dashboard, setDashboard] = useState(true)
  const [Formulario, setFormulario] = useState(false)
  const [ViewCourseDetail, setViewCourseDetail] = useState(false)
  const selectedCourseRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("")  
  const validatedError = (error)=>{
    if(error == 'El token ha expirado'){  
     logout()
    }
  }
useEffect(() => {
  loadCourses(user?.id)
  if(error){
    validatedError(error)
  }
}, []);
  
  const filteredCourses = courses.filter((course) =>
    course.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    !loading?
      <div className="container-home">
       <MenuHome courses={courses} OnClickButtonCreate={()=>{ 
                selectedCourseRef.current = null
                setFormulario(true);
                setDashboard(false);
                setCourses(false)
                setViewCourseDetail(false);
              }} 
              onClickDashboard={() => {
                setCourses(false);
                setDashboard(true);
                setFormulario(false)
                setViewCourseDetail(false);
              }} 
            onClickCourses={() => {
            setCourses(true);
            setDashboard(false);
            setFormulario(false)
            setViewCourseDetail(false);
          }}
          OnClickCourse={()=>{
            setCourses(false);
            setDashboard(false)
            setFormulario(false)
            setViewCourseDetail(!ViewCourseDetail)
          }}
          selectedCourseRef={selectedCourseRef}
          courseList={courses}/>
        <div className="home-content">
          <Header/>          
          <div className="content-info">                      
              {
                Dashboard && (
                  <>
                    <div>
                      <TitleTyping text={`Bienvenid@, ${user?.nombre || 'Invitado'}`}/>
                    </div>
                  <div className="dashboard">
                    <div className="dashboard-left">
                      <div className="dashboard-graphics">
                        <div>
                          <GraphicTort courses={courses}/>
                        </div>
                        <div>
                          <GraphicBar />
                        </div>
                        <div>
                          <BarChartExample />
                        </div>                  
                      </div>                      
                    </div>
                    <div className="dashboard-right">
                  <div className="profile-section">
                    <img
                      src={sensorImg}
                      alt="Profile"
                      className="profile-image"
                    />
                    <h2 className="profile-name">{user?.nombre || "Invitado"}</h2>
                    <p className="profile-job">{user?.area || "Area no disponible"}</p>
                  </div>
                  <div className="active-courses">
                    <h3>Lista de Cursos</h3>
                    <ul>
                      {courses.map((course) => (
                        <li className="course-card" key={course.id}>
                          {course.titulo}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="reminders">
                    <h3>¡Bienvenido a bordo!</h3>
                    <ul>
                      <li>¡Bienvenido a nuestro sistema! </li>
                      <li>Aquí podrás gestionar tus tareas de forma rápida y eficiente.</li>
                      <li>Estamos listos para ayudarte a alcanzar tus objetivos.</li>
                    </ul>

                    <h3>Recordatorios</h3>
                    <ul>
                      <li>No hay Recordatorios disponibles por el momento...</li>
                    </ul>
                  </div>
                </div>
                  </div>
                  
                  </>
                     )
                    }   

          {Courses && (
            
            <div className="content-courses">
              <div className="courses-header">
                <span className="courses-header-title">Cursos</span>
                <span className="courses-header-link">Ver Todos</span>
              </div>
              <SearchBar onSearch={setSearchQuery} />
              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <CardCourse
                  onClick={() => {
                    selectedCourseRef.current = course;
                    setViewCourseDetail(true);
                    setCourses(false) 
                  }}
                  key={course.id}
                  title={course.titulo}
                  description={course.descripcion_larga}
                  estado={course.estado}
                />
                ))}
              </div>
            </div>
            )}
            { ViewCourseDetail && selectedCourseRef.current &&(
               <div className='container-CourseDetail'>
               <CourseDetail course={selectedCourseRef.current}/>
               </div>
            ) 
                   
            }
         {
  Formulario ? (
    <FormCreate
    courseData={selectedCourseRef.current || null} // Pasa el curso seleccionado o null para crear uno nuevo
    onSubmitAction={(data) => {
      if (!selectedCourseRef.current) {
        // Si no hay curso seleccionado, crea un nuevo curso
        crearCurso(data);
      } else {
        // Si hay curso seleccionado, edítalo
        editarCurso(selectedCourseRef.current.id, data);
      }
      setFormulario(false); // Cierra el formulario
      setDashboard(true); // Redirige al dashboard
    }}
  />
  ) : (
    ''
  )
}
          </div>
        </div>
      </div>
      
      :
      <div className='container-loading'>
      <Mosaic color="#32cd32" size="large" text="Loading..." textColor="" />
      </div>  
  );
};
