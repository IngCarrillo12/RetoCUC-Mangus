import React from 'react';
import Timeline from './TimeLine';
import '../style/CourseDetail.css';

const CourseDetail = ({ course }) => {
    
    return (
        <div className="container-CourseDetail">
            <div className="courseDetail">
                <div className="courseDetail-header">
                    <h1>course.titulo</h1>
                    <p>Este curso se imparte por un profesor gatuno con una bata blanca y te ensena react con ejemplos que solo los gatos pueden entender   </p>
                </div>
                <div className="courseDetail-stat">
                    {/* Contenedor de la descripción */}
                    <div className="stat-description">
                        <ul>
                            <li>
                                <b>Duración:</b> 20 Min
                            </li>
                            <li>
                                <b>Unidades:</b> 100
                            </li>
                            <li>
                                <b>Lecciones:</b> 50
                            </li>
                        </ul>
                    </div>
                    {/* Contenedor del timeline */}
                    <div className="stat-timeline">
                        <Timeline estado="creado" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;


