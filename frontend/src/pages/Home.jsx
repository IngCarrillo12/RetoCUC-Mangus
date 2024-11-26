
import '../style/home.css'
import React, { useEffect, useState, useRef } from "react";
import { Header } from "../components/header.jsx";
import { CardCourse } from '../components/CardCourse.jsx';
import { GraphicTort } from '../components/GraphicTort.jsx';
import { GraphicBar } from '../components/GraphicBar.jsx';
import { MenuHome } from "../components/MenuHome.jsx";
import FormCreate from '../components/FormCreate.jsx';
import { SearchBar } from "../components/SearchBar.jsx";
import { useCourseStore } from '../store/CourseStore.jsx';
import  CourseDetail  from '../components/CourseDetail.jsx';
import {Mosaic} from 'react-loading-indicators'
import BarChartExample from '../components/GraphicResource.jsx';
import { useAuthStore } from "../store/AuthStore.jsx"; // Importamos el store para obtener el usuario
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import {TitleTyping} from '../components/TitleTyping.jsx'
export const Home= () => {
  const { user, logout } = useAuthStore(); // Obtenemos el usuario autenticado y la función logout
  const { loadCourses, loading, error } = useCourseStore() 
  const courses = useCourseStore((state) => state.courses)
  const [Courses, setCourses] = useState(false)
  const [Dashboard, setDashboard] = useState(true)
  const [Formulario, setFormulario] = useState(false)
  const [ViewCourseDetail, setViewCourseDetail] = useState(false)
  const selectedCourseRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("")  
  const navigate = useNavigate();

// Componente TitleTyping dinámico

useEffect(() => {
  loadCourses('1')
}, []);
  
console.log(user)
  const courseList = [
    { id: 1, title: "Web Design templates", description: "Learn web design.", progress: 75 },
    { id: 2, title: "React Basics", description: "Understand React concepts.", progress: 40 },
    { id: 3, title: "Advanced CSS", description: "Master CSS techniques.", progress: 90 },
    { id: 4, title: "JavaScript Fundamentals", description: "Learn JavaScript.", progress: 25 },
    { id: 5, title: "Node.js Essentials", description: "Dive into backend development with Node.js.", progress: 50 },
    { id: 6, title: "Responsive Web Design", description: "Create designs that adapt to all screen sizes.", progress: 80 },
  ];
  const filteredCourses = courses.filter((course) =>
    course.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    !loading?
      <div className="container-home">
       <MenuHome courses={courses} OnClickButtonCreate={()=>{() => {
                setFormulario(true);
                setDashboard(false);
                setCourses(false)
                setViewCourseDetail(false);
              }}} 
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
          courseList={courseList}/>
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
                      <div>
                      <BarChartExample />
                    </div>
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
                    <h3>Active Courses</h3>
                    <ul>
                      {courseList.map((course) => (
                        <li className="course-card" key={course.id}>
                          {course.title}
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
              Formulario?
              <FormCreate/>
              :''
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
