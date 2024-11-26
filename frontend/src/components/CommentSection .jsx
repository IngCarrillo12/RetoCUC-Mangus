import React, { useState } from 'react';
import '../style/commentSection.css';

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, user: 'Maria', comment: 'Correcciones en la tercer unidad', replies: [] },
    { id: 2, user: 'Maria', comment: 'Cambios en lección 2 de la quinta unidad', replies: [] },
    { id: 3, user: 'Alexa', comment: 'Recursos Incompletos', replies: [] }
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleReplyChange = (event, commentId) => {
    setReplyTexts({
      ...replyTexts,
      [commentId]: event.target.value
    });
  };

  const handlePostComment = () => {
    if (newComment.trim() !== '') {
      setComments([
        ...comments,
        { id: comments.length + 1, user: 'Juan', comment: newComment, replies: [] }
      ]);
      setNewComment('');
    }
  };

  const handlePostReply = (commentId) => {
    const replyText = replyTexts[commentId];

    if (replyText.trim() !== '') {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...comment.replies, { user: 'Juan', text: replyText }]
              }
            : comment
        )
      );
      setReplyTexts({
        ...replyTexts,
        [commentId]: ''
      });
      setActiveReplyId(null); 
    }
  };

  const toggleReplyArea = (commentId) => {
    setActiveReplyId(activeReplyId === commentId ? null : commentId);
  };

  return (
    <div className="discussion-container">
      <div className="discussion">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="user-name">{comment.user}</span>
            </div>
            <p>{comment.comment}</p>

            <div className="replies">
              {comment.replies.map((reply, index) => (
                <div key={index} className="reply">
                  <span className="user-name">{reply.user} (respuesta)</span> - {reply.text}
                </div>
              ))}
            </div>

            <button className="btn-answer" onClick={() => toggleReplyArea(comment.id)}>
              Responder
            </button>

            {activeReplyId === comment.id && (
              <>
                <input
                  value={replyTexts[comment.id] || ''}
                  onChange={(event) => handleReplyChange(event, comment.id)}
                  placeholder="Escribe tu respuesta..."
                />
                <button className="btn-reply"
                  onClick={() => handlePostReply(comment.id)}
                  disabled={(replyTexts[comment.id] || '').trim() === ''}
                >
                  Publicar Respuesta
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button onClick={handlePostComment} disabled={newComment.trim() === ''}>
        Publicar Comentario
      </button>
    </div>
  );
};

export default CommentSection;
