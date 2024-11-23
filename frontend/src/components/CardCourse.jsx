import React from 'react'
import '../style/cardCourse.css'
export const CardCourse = () => {
  return (
    <div className="card">
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
      <div className='card-img'>
        <img src="https://img.freepik.com/vector-gratis/concepto-tutoriales-linea_52683-37480.jpg" alt="" />
      </div>
 
    <div className="card-title">Web Design templates Selection</div>
    <div className="card-subtitle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod.
    </div>
    <div className="card-indicator">
      <span className="card-indicator-amount">135</span> Projects /{" "}
      <span className="card-indicator-percentage">75%</span>
    </div>
    <div className="card-progress">
      <progress value="75" max="100"></progress>
    </div>
  </div>
  )
}
