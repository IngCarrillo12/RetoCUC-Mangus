import React from "react";
import "../style/Timeline.css";

export const Timeline = ({ estado }) => {
  console.log(estado)
  return (
    <div className="timeline">
      {/* Paso 1 */}
      <div className={`timeline-step ${["borrador", "creado", "revision", "finalizado"].includes(estado) ? "active" : ""}`}>
        <div className="circle">1</div>
        <div className="label">Borrador</div>
        <div className={`timeline-line ${["creado", "revision", "finalizado"].includes(estado) ? "active" : ""}`}></div>
      </div>

      {/* Paso 2 */}
      <div className={`timeline-step ${["creado", "revision", "finalizado"].includes(estado) ? "active" : ""}`}>
        <div className="circle">2</div>
        <div className="label">Creado</div>
        <div className={`timeline-line ${["revision", "finalizado"].includes(estado) ? "active" : ""}`}></div>
      </div>

      {/* Paso 3 */}
      <div className={`timeline-step ${["revision", "finalizado"].includes(estado) ? "active" : ""}`}>
        <div className="circle">3</div>
        <div className="label">Revisión</div>
        <div className={`timeline-line ${estado === "finalizado" ? "active" : ""}`}></div>
      </div>

      {/* Paso 4 */}
      <div className={`timeline-step ${estado === "finalizado" ? "active" : ""}`}>
        <div className="circle">4</div>
        <div className="label">Finalizado</div>
      </div>
    </div>
  );
};
