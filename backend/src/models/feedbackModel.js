import db from '../configDB/db.js';

export const createFeedbackModel = async ({ curso_id, admin_id, comentario }) => {
    const [result] = await db.query(
        `INSERT INTO Feedback (curso_id, admin_id, comentario, fecha) VALUES (?, ?, ?, NOW())`,
        [curso_id, admin_id, comentario]
    );
    return result.insertId;
};

export const getFeedbackByCourseIdModel = async (curso_id) => {
    const [rows] = await db.query('SELECT cursos.titulo, usuarios.nombre, feedback.comentario, feedback.fecha ' +
        'FROM feedback ' +
        'INNER JOIN cursos ON feedback.curso_id = cursos.id ' +
        'INNER JOIN usuarios ON feedback.admin_id = usuarios.id ' +
        'WHERE feedback.curso_id = ?', [curso_id]);
    return rows;
};

// Obtener feedback específico por ID
export const getFeedbackByIdModel = async (feedback_id) => {
    const [rows] = await db.query('SELECT * FROM Feedback WHERE feedback_id = ?', [feedback_id]);
    return rows[0]; 
};