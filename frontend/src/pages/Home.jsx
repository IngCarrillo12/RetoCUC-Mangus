import '../style/home.css';
import React, { useEffect, useState } from "react";
import { Header } from "../components/header.jsx";
import { CardCourse } from '../components/CardCourse.jsx';
import { GraphicTort } from '../components/GraphicTort.jsx';
import { GraphicBar } from '../components/GraphicBar.jsx';
import { MenuHome } from "../components/MenuHome.jsx";
import FormCreate from '../components/FormCreate.jsx';
import { SearchBar } from "../components/SearchBar.jsx";
import BarChartExample from '../components/GraphicResource.jsx';
import { useAuthStore } from "../store/AuthStore.jsx"; // Importamos el store para obtener el usuario

// Componente TitleTyping dinámico
const TitleTyping = ({ text }) => {
  const textRef = React.useRef(null);

  useEffect(() => {
    const element = textRef.current;
    const textWidth = element.scrollWidth; // Obtén el ancho del texto
    const animationDuration = `${text.length / 10}s`; // Calcula la duración basada en el texto

    element.style.animation = `typing ${animationDuration} steps(${text.length}, end) forwards, blink 0.75s step-end infinite`;
    element.style.setProperty('--text-width', `${textWidth}px`);
  }, [text]);

  return <h1 className="title-typing" ref={textRef}>{text}</h1>;
};

export const Home = () => {
  const { user } = useAuthStore(); // Obtenemos el usuario autenticado
  const [Courses, setCourses] = useState(false);
  const [Dashboard, setDashboard] = useState(true);
  const [Formulario, setFormulario] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  

  const courseList = [
    { id: 1, title: "Web Design templates", description: "Learn web design.", progress: 75 },
    { id: 2, title: "React Basics", description: "Understand React concepts.", progress: 40 },
    { id: 3, title: "Advanced CSS", description: "Master CSS techniques.", progress: 90 },
    { id: 4, title: "JavaScript Fundamentals", description: "Learn JavaScript.", progress: 25 },
    { id: 5, title: "Node.js Essentials", description: "Dive into backend development with Node.js.", progress: 50 },
    { id: 6, title: "Responsive Web Design", description: "Create designs that adapt to all screen sizes.", progress: 80 },
  ];

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-home">
      <MenuHome setCourses={setCourses} setDashboard={setDashboard} setFormulario={setFormulario} courseList={courseList} />
      <div className="home-content">
        <Header />
        <div className="content-info">
          {/* Cambiamos el título dinámico para usar el nombre del usuario */}
          {Dashboard && (
            <div>
              <div className="home-header">
                <TitleTyping text={`Welcome, ${user?.nombre || "Guest"}!`} />
              </div>
              <div className="dashboard">
                <div className="dashboard-left">
                  <div className="dashboard-graphics">
                    <div>
                      <GraphicTort />
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
                    <h2 className="profile-name">{user?.nombre || "Juan Pérez"}</h2>
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
            </div>
          )}

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
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    progress={course.progress}
                  />
                ))}
              </div>
            </div>
          )}

          {Formulario && <FormCreate />}
        </div>
      </div>
    </div>
  );
};
