import React, { useEffect, useState } from "react";
import { useFeedbackStore } from "../store/FeedStore.jsx";
import "../style/feedbackResponse.css";

export const FeedbackResponse = ({cursoId, adminId}) => {
  const { feedbacks, loading, error, loadFeedbacks, sendFeedback } = useFeedbackStore();
  const [comentario, setComentario] = useState("");
  const [sending, setSending] = useState(false); 
  const [message, setMessage] = useState("");
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    loadFeedbacks(cursoId);
  }, [cursoId, loadFeedbacks]);

  const handleCommentChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    
    try {
      const responseMessage = await sendFeedback(parseInt(cursoId), parseInt(adminId),comentario);
      setMessage(responseMessage);
      setComentario("");
      loadFeedbacks(cursoId);
    } catch (error) {
      setMessage("Hubo un error al enviar el comentario.");
    } finally {
      setSending(false);
    }
  };

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
        {loading ? (
          <p>Cargando comentarios...</p>
        ) : feedbacks && feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-header">
                <div>
                  <h2 className="feedback-title">Curso: {feedback.titulo}</h2>
                  <p className="feedback-subtitle">Supervisor: {feedback.nombre}</p>
                  <p className="feedback-date">{formatDate(feedback.fecha)}</p>
                </div>
              </div>
              <p className="feedback-message">{feedback.comentario}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
      </div>
  
      <div className="feedback-form-container">
        <h2>Enviar un comentario</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comentario}
            onChange={handleCommentChange}
            placeholder="Escribe tu comentario..."
            rows="4"
            required
          />
          <button type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Enviar comentario"}
          </button>
        </form>
  
        {message && <p>{message}</p>}
      </div>
    </div>
  );  
};
