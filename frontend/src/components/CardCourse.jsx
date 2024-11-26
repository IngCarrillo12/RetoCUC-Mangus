import React from 'react';
import '../style/cardCourse.css';
import Timeline from '../components/TimeLine.jsx'
export const CardCourse = ({ title, description, estado, onClick}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-wrapper">
        <svg
          fill="none"
          height="20"
          viewBox="0 0 4 20"
          width="4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#000">
            <path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z" />
            <path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z" />
            <path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z" />
          </g>
        </svg>
      </div>
      <div className="card-img">
        <img
          src="https://img.freepik.com/vector-gratis/concepto-tutoriales-linea_52683-37480.jpg"
          alt={title}
        />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{description}</div>
      <div className="card-progress">
        <Timeline estado={estado}/>
      </div>
    </div>
  );
};