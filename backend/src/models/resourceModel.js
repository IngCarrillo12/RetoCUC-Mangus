import db from '../configDB/db.js'

// Crear un recurso
export const createResourceModel = async (data) => {
    const { leccion_id, tipo, nombre, url } = data;

    const [result] = await db.query(
        `INSERT INTO Recursos (leccion_id, tipo, nombre, url) VALUES (?, ?, ?, ?)`,
        [leccion_id, tipo, nombre, url]
    );
    return result.insertId; // Devuelve el ID del recurso creado
};

// Obtener todos los recursos de una lección
export const getResourcesByLessonIdModel = async (leccion_id) => {
    const [rows] = await db.query('SELECT * FROM Recursos WHERE leccion_id = ?', [leccion_id]);
    return rows; // Devuelve los recursos asociados a la lección
};

// Obtener un recurso específico por ID
export const getResourceByIdModel = async (recurso_id) => {
    const [rows] = await db.query('SELECT * FROM Recursos WHERE recurso_id = ?', [recurso_id]);
    return rows[0]; // Devuelve el recurso o undefined si no existe
};

// Actualizar un recurso
export const updateResourceModel = async (recurso_id, data) => {
    const { tipo, nombre, url } = data;

    const [result] = await db.query(
        `UPDATE Recursos SET tipo = ?, nombre = ?, url = ? WHERE recurso_id = ?`,
        [tipo, nombre, url, recurso_id]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
};

// Eliminar un recurso
export const deleteResourceModel = async (recurso_id) => {
    const [result] = await db.query('DELETE FROM Recursos WHERE recurso_id = ?', [recurso_id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
};
