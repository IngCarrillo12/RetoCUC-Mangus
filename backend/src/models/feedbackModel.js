import db from '../config/db.js';


// Crear un feedback
export const createFeedbackModel = async ({ curso_id, admin_id, comentario }) => {
    const [result] = await db.query(
        `INSERT INTO Feedback (curso_id, admin_id, comentario, fecha) VALUES (?, ?, ?, NOW())`,
        [curso_id, admin_id, comentario]
    );
    return result.insertId; // Devuelve el ID del feedback creado
};

// Obtener feedback por curso
export const getFeedbackByCourseIdModel = async (curso_id) => {
    const [rows] = await db.query('SELECT * FROM Feedback WHERE curso_id = ?', [curso_id]);
    return rows; // Devuelve el feedback asociado al curso
};

// Obtener feedback específico por ID
export const getFeedbackByIdModel = async (feedback_id) => {
    const [rows] = await db.query('SELECT * FROM Feedback WHERE feedback_id = ?', [feedback_id]);
    return rows[0]; // Devuelve el feedback o undefined si no existe
};


