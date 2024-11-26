import db from '../configDB/db.js'

    // Crear una lección
    export const createLessonModel = async (data) => {
        const {
            unidad_id,
            titulo,
            tematicas = '',  // Asigna valores vacíos si no se envían
            resultados_aprendizaje = '',  // Asigna valores vacíos si no se envían
            tipo = '',  // Asigna valores vacíos si no se envían
            proposito = '',  // Asigna valores vacíos si no se envían
            duracion,
            semana_sugerida
        } = data;
    
        try {
            // Inserta la lección en la tabla 'Lecciones'
            const [result] = await db.query(
                `INSERT INTO Lecciones 
                (unidad_id, titulo, tematicas, resultados_aprendizaje, tipo, 
                proposito, duracion, semana_sugerida) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    unidad_id,
                    titulo,
                    tematicas,
                    resultados_aprendizaje,
                    tipo,
                    proposito,
                    duracion,
                    semana_sugerida
                ]
            );
    
            // Devuelve el ID de la lección creada
            return result.insertId;
        } catch (error) {
            console.error('Error al crear la lección:', error);
            throw new Error('Error al crear la lección');
        }
    };
    export const updateLessonModel = async (leccion_id, leccion) => {
        const {
            titulo,
            tematicas,
            resultados_aprendizaje,
            tipo,
            proposito,
            duracion,
            semana_sugerida,
            unidad_id
        } = leccion;
    
        const [result] = await db.query(
            `UPDATE Lecciones SET 
            titulo = ?, 
            tematicas = ?, 
            resultados_aprendizaje = ?, 
            tipo = ?, 
            proposito = ?, 
            duracion = ?, 
            semana_sugerida = ?, 
            unidad_id = ?
            WHERE leccion_id = ?`,
            [
                titulo,
                tematicas,
                resultados_aprendizaje,
                tipo,
                proposito,
                duracion,
                semana_sugerida,
                unidad_id,
                leccion_id
            ]
        );
    
        return result.affectedRows; // Devuelve el número de filas afectadas
    };
    
    
    // Obtener todas las lecciones de una unidad
export const getLessonsByUnitIdModel = async (unidad_id) => {
    const [rows] = await db.query(
        'SELECT * FROM Lecciones WHERE unidad_id = ? ORDER BY semana_sugerida',
        [unidad_id]
    );
    return rows; // Devuelve todas las lecciones de la unidad
};

// Obtener una lección específica por ID
export const getLessonByIdModel = async (leccion_id) => {
    const [rows] = await db.query('SELECT * FROM Lecciones WHERE leccion_id = ?', [leccion_id]);
    return rows[0]; // Devuelve la lección o undefined si no existe
};

// Actualizar una lección


// Eliminar una lección
export const deleteLessonModel = async (leccion_id) => {
    const [result] = await db.query('DELETE FROM Lecciones WHERE leccion_id = ?', [leccion_id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
};



 