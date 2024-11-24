import React from "react";
import "../style/Timeline.css";

export const Timeline = ({ currentStep }) => {
  return (
    <div className="timeline">
      <div className={`timeline-step ${currentStep >= 1 ? "active" : ""}`}>
        <div className="circle">1</div>
        <div className="label">Inicio</div>
        <div className="timeline-line"></div>
      </div>
      <div className={`timeline-step ${currentStep >= 2 ? "active" : ""}`}>
        <div className="circle">2</div>
        <div className="label">En progreso</div>
        <div className="timeline-line"></div>
      </div>
      <div className={`timeline-step ${currentStep >= 3 ? "active" : ""}`}>
        <div className="circle">3</div>
        <div className="label">Finalizado</div>
      </div>
    </div>
  );
};

