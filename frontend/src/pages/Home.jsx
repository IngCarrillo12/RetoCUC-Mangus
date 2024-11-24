import '../style/home.css'
import React, { useEffect, useState } from "react";
import { Header } from "../components/header.jsx";
import { CardCourse } from '../components/CardCourse.jsx'
import { GraphicTort } from '../components/GraphicTort.jsx'
import { GraphicBar } from '../components/GraphicBar.jsx'
import { MenuHome } from "../components/MenuHome.jsx";
import FormCreate from '../components/FormCreate.jsx';

export const Home= () => {
 
  const [Courses, setCourses] = useState(false)
  const [Dashboard, setDashboard] = useState(true)
  const [Formulario, setFormulario] = useState(false)

  return (
      <div className="container-home">
       <MenuHome  setCourses={setCourses} setDashboard={setDashboard} setFormulario={setFormulario}/>
        <div className="home-content">
          <Header/>
          <div className="content-info">
            <h1>Welcome, Sr Juan</h1>
              {
                Dashboard?
                <div className="dashboard">
              <div className="dashboard-graphics">
              <GraphicTort/>
              <GraphicBar/>
              </div>
              
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae pariatur voluptatibus maiores, reprehenderit neque qui atque optio itaque excepturi molestias dignissimos ea quas, placeat doloribus aspernatur obcaecati sunt consectetur facere.</p>
              </div>
                :''
              }           
           
            {
              Courses?
              <div className="content-courses">
              <div className="courses-header">
                <span className="courses-header-title">Courses</span>
                <span className="courses-header-link">View All</span>
              </div>
              <div className="courses-cards">
              <CardCourse/>
              <CardCourse/>
              <CardCourse/>
                  
                
              </div>
            </div>
              :''
            }

            {
              Formulario?
              <FormCreate/>
              :''
            }
            
          </div>
        </div>
      </div>
  );
};

