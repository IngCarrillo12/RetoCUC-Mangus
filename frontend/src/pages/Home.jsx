import React from "react";
import { Header } from "../components/header.jsx";
import { CardCourse } from '../components/CardCourse.jsx'
import { GraphicTort } from '../components/GraphicTort.jsx'
import { GraphicBar } from '../components/GraphicBar.jsx'
import '../style/home.css'
import { MenuHome } from "../components/MenuHome.jsx";
export const Home= () => {
  return (
      <div className="container-home">
       <MenuHome/>
        <div className="home-content">
          <Header/>
          <div className="content-info">
            <h1>Welcome, Sr Juan</h1>
            <div className="dashboard">
              <GraphicTort/>
              <GraphicBar/>
            </div>
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
          </div>
        </div>
      </div>
  );
};

