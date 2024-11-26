import axios from 'axios';

export const fetchFeedbacks = async (cursoId) => {
    
  try {
    const { data } = await axios.get(`http://localhost:3000/api/feedback/${cursoId}`);
    return data;
  } catch (error) {
    console.log(`Error al obtener comentarios: ${error}`);
    throw new Error('No se pudieron obtener los comentarios');
  }
};

export const postFeedback = async (curso_id, admin_id, comentario) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/feedback/${curso_id}`, {
      admin_id,
      comentario,
    });
    return response.data;
  } catch (error) {
    throw new Error("Hubo un error al enviar el comentario.");
  }
};
