import db from '../configDB/db.js'

    // Crear una lección
    export const createLesson = async(data) => {
        const {
            unidad_id,
            titulo,
            tematicas,
            resultados_aprendizaje,
            tipo,
            caracteristicas,
            proposito,
            duracion,
            semana_sugerida
        } = data;

        const [result] = await db.query(
            `INSERT INTO Lecciones (unidad_id, titulo, tematicas, resultados_aprendizaje, tipo, caracteristicas, 
            proposito, duracion, semana_sugerida) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                unidad_id,
                titulo,
                tematicas,
                resultados_aprendizaje,
                tipo,
                caracteristicas,
                proposito,
                duracion,
                semana_sugerida
            ]
        );
        return result.insertId; // Devuelve el ID de la lección creada
    }
    // Obtener todas las lecciones de una unidad
export const getLessonsByUnitId = async (unidad_id) => {
    const [rows] = await db.query(
        'SELECT * FROM Lecciones WHERE unidad_id = ? ORDER BY semana_sugerida',
        [unidad_id]
    );
    return rows; // Devuelve todas las lecciones de la unidad
};

// Obtener una lección específica por ID
export const getLessonById = async (leccion_id) => {
    const [rows] = await db.query('SELECT * FROM Lecciones WHERE leccion_id = ?', [leccion_id]);
    return rows[0]; // Devuelve la lección o undefined si no existe
};

// Actualizar una lección
export const updateLesson = async (leccion_id, data) => {
    const {
        titulo,
        tematicas,
        resultados_aprendizaje,
        tipo,
        caracteristicas,
        proposito,
        duracion,
        semana_sugerida
    } = data;

    const [result] = await db.query(
        `UPDATE Lecciones SET titulo = ?, tematicas = ?, resultados_aprendizaje = ?, tipo = ?, caracteristicas = ?, 
        proposito = ?, duracion = ?, semana_sugerida = ? WHERE leccion_id = ?`,
        [
            titulo,
            tematicas,
            resultados_aprendizaje,
            tipo,
            caracteristicas,
            proposito,
            duracion,
            semana_sugerida,
            leccion_id
        ]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
};

// Eliminar una lección
export const deleteLesson = async (leccion_id) => {
    const [result] = await db.query('DELETE FROM Lecciones WHERE leccion_id = ?', [leccion_id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
};



 