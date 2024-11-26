
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
                      <TitleTyping text={`Welcome, ${user?.nombre || 'Guest'}`}/>
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
                      </div>
                      <div>
                      <BarChartExample />
                    </div>
                    </div>
                    <div className="dashboard-right">
                  <div className="profile-section">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Profile"
                      className="profile-image"
                    />
                    <h2 className="profile-name">{user?.nombre || "Guest"}</h2>
                    <p className="profile-job">{user?.area || "Professor - Computer Science"}</p>
                  </div>
                  <div className="active-courses">
                    <h3>Courses List</h3>
                    <ul>
                      {courses.map((course) => (
                        <li className="course-card" key={course.id}>
                          {course.titulo}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="reminders">
                    <h3>Reminders</h3>
                    <ul>
                      <li>Your next class is tomorrow at 10 AM</li>
                      <li>Grade assignments for "React Basics"</li>
                      <li>Prepare slides for JavaScript lecture</li>
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
                <span className="courses-header-title">Courses</span>
                <span className="courses-header-link">View All</span>
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
      courseData={null} // Pasa null para crear un curso nuevo
      onSubmitAction={(data) => {
        if (!cursoExistente) {
          crearCurso(data); // Crea un nuevo curso
        } else {
          editarCurso(cursoExistente.id, data); // Edita un curso existente
        }
        setFormulario(false); // Cierra el formulario después de crear o editar
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
