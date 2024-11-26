import React, { useEffect } from "react";
import { useFeedbackStore } from "../store/FeedStore.jsx";
import "../style/FeedbackCards.css";

export const FeedbackCards = ({cursoId}) => {
  const { feedbacks, loading, error, loadFeedbacks } = useFeedbackStore();

  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    loadFeedbacks(cursoId);
  }, [cursoId, loadFeedbacks]);

  if (loading) {
    return <p>Cargando comentarios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Comentarios del Administrador</h1>
      <div className="feedback-cards">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <div className="feedback-header">
              <div>
                <h2 className="feedback-title">Curso: {feedback.titulo}</h2>
                <p className="feedback-subtitle">Supervisor: {feedback.nombre}</p>
                <p className="feedback-date">{formatDate(feedback.fecha)}</p>
              </div>
            </div>
            <p className="feedback-message">{feedback.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
