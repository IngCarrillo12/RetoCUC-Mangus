import db from '../configDB/db.js'

    // Crear una unidad
    export const createUnitModel = async(data) =>{
        const { curso_id, titulo, descripcion } = data;
        const [result] = await db.query(
            'INSERT INTO Unidades (curso_id, titulo, descripcion) VALUES (?, ?, ?)',
            [curso_id, titulo, descripcion]
        );
        return result.insertId; // Devuelve el ID de la unidad creada
    }
    export const updateUnitModel = async (unidad_id, unidad) => {
        const { titulo, descripcion, curso_id } = unidad;
        const [result] = await db.query(
            `UPDATE Unidades SET 
            titulo = ?, 
            descripcion = ?, 
            curso_id = ? 
            WHERE id = ?`,
            [titulo, descripcion, curso_id, unidad_id]
        );
    
        return result.affectedRows; // Devuelve el número de filas afectadas
    };
    
    // Obtener todas las unidades de un curso
  export const getUnitsByCourseIdModel = async(curso_id) =>{
        const [rows] = await db.query(
            'SELECT * FROM Unidades WHERE curso_id = ? ORDER BY titulo',
            [curso_id]
        );
        return rows; // Devuelve todas las unidades del curso
    }

    // Obtener una unidad específica por ID
  export const getUnitByIdModel = async(unidad_id) => {
        const [rows] = await db.query('SELECT * FROM Unidades WHERE id = ?', [unidad_id]);
        return rows[0]; // Devuelve la unidad o undefined si no existe
    }


    

    // Eliminar una unidad
    export const deleteUnitModel = async(unidad_id) =>{
        console.log(unidad_id)
        const [result] = await db.query('DELETE FROM Unidades WHERE id = ?', [unidad_id]);
        return result.affectedRows; // Devuelve el número de filas afectadas
    }

