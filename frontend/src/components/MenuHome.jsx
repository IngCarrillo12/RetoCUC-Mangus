import React from 'react';
import '../style/menuHome.css';

export const MenuHome = ({nameCourse, setCourses, setDashboard, setFormulario }) => {
  return (
    <div className="home-menu">
      <h3 className="menu-title">
        <span role="img" aria-label="mango" style={{ marginRight: '8px' }}>🥭</span>Mangus
      </h3>
      
      <section className="menu-section">
        <div className="menu-dashboard">
          <div
            className="section-title"
            onClick={() => {
              setCourses(false);
              setDashboard(true);
              setFormulario(false)
            }}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </div>
        </div>
      </section>

      <section className="menu-section">
        <div
          className="section-title"
          onClick={() => {
            setCourses(true);
            setDashboard(false);
            setFormulario(false)
          }}
        >
          <i className="fas fa-book"></i>
          <span>Courses</span>
        </div>

        <ul className="section-list">
          <li>Course</li>
          <li>Course</li>
          <li>Course</li>
          <li>Course</li>
          <li>Course</li>
          
          <div className="section-container-button">
            <button onClick={()=>{setFormulario(true); setDashboard(false); setCourses(false)}}>
              <i className="fas fa-plus"></i>
              <span>Create Course</span>
            </button>
          </div>

        </ul>
      </section>

      <section className="menu-section">
        <div className="section-title">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </div>
        <ul className="section-list">
          <li>Account</li>
          <li>Notification</li>
        </ul>
      </section>

      <div className="container-logout">
        <button>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};


