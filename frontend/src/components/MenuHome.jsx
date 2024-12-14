import React from 'react';
import '../style/menuHome.css';
import { useAuthStore } from '../store/AuthStore';

export const MenuHome = ({ courses, OnClickButtonCreate, onClickDashboard, onClickCourses,selectedCourseRef, OnClickCourse}) => {
  const {logout} = useAuthStore()
  return (
    <div className="home-menu">
      <h3 className="menu-title">
        <span role="img" aria-label="mango" style={{ marginRight: '8px' }}>🥭</span>Mangus
      </h3>
      
      <section className="menu-section">
        <div className="menu-dashboard">
          <div
            className="section-title"
            onClick={onClickDashboard}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </div>
        </div>
      </section>

      <section className="menu-section">
        <div
          className="section-title"
          onClick={onClickCourses}
        >
          <i className="fas fa-book"></i>
          <span>Cursos</span>
        </div>        

        <ul className="section-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item"  onClick={() => {
              selectedCourseRef.current = course;
              OnClickCourse();
            }}>
              <i className="fas fa-book course-icon"></i>
              <span className="course-title">{course.titulo}</span>
            </li>
          ))}
          <div className="section-container-button">
            <button
              onClick={OnClickButtonCreate}
            >
              <i className="fas fa-plus"></i>
              <span>Crear Curso</span>
            </button>
          </div>
        </ul>

      </section>

      <section className="menu-section">
        <div className="section-title">
          <i className="fas fa-cog"></i>
          <span>Configuración</span>
        </div>
        <ul className="section-list">
          <li>Cuenta</li>
          <li>Notificación</li>
        </ul>
      </section>

      <div className="container-logout">
        <button onClick={()=>logout()}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};
