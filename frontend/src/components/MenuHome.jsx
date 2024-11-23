import React from 'react'
import '../style/menuHome.css'
export const MenuHome = ({nameCourse, setCourses, StateCourses,setDashboard ,Dashboard}) => {

  return (
    <div className="home-menu">
    <h3 className="menu-title">Mangus</h3>
    <div className="menu-dasboard">
    <span className="menu-subtitle" onClick={()=>{setCourses(!StateCourses); setDashboard(!Dashboard)}}>Dashboard</span>
    </div>
    <section className="menu-section">
      <span className="section-title" onClick={()=>{setCourses(!StateCourses); setDashboard(!Dashboard)}}>Courses</span>
      <ul className="section-list">
        <li>Course</li>
        <li>Course</li>
        <li>Course</li>
        <li>Course</li>
        <li>Course</li>
      </ul>
      <div className="section-container-button">
      <button >Create Course</button>
      </div>        
    </section>
    <section className="menu-section">
      <span className="section-title">Settings</span>
      <ul className="section-list">
        <li>Account</li>
        <li>Notificacion</li>
      </ul>
    </section>
    <div className="container-logout">
      <button>Logout</button>
    </div>
  </div>
  )
}