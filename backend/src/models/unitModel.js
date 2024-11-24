import db from '../configDB/db.js'

    // Crear una unidad
    export const createUnit = async(data) =>{
        const { curso_id, titulo, descripcion } = data;
        const [result] = await db.query(
            'INSERT INTO Unidades (curso_id, titulo, descripcion) VALUES (?, ?, ?)',
            [curso_id, titulo, descripcion]
        );
        return result.insertId; // Devuelve el ID de la unidad creada
    }

    // Obtener todas las unidades de un curso
  export const getUnitsByCourseId = async(curso_id) =>{
        const [rows] = await db.query(
            'SELECT * FROM Unidades WHERE curso_id = ? ORDER BY titulo',
            [curso_id]
        );
        return rows; // Devuelve todas las unidades del curso
    }

    // Obtener una unidad específica por ID
  export const getUnitById = async(unidad_id) => {
        const [rows] = await db.query('SELECT * FROM Unidades WHERE unidad_id = ?', [unidad_id]);
        return rows[0]; // Devuelve la unidad o undefined si no existe
    }

    // Actualizar una unidad
    export const updateUnit= async(unidad_id, titulo, descripcion) => {
        const [result] = await db.query(
            'UPDATE Unidades SET titulo = ?, descripcion = ? WHERE unidad_id = ?',
            [titulo, descripcion, unidad_id]
        );
        return result.affectedRows; // Devuelve el número de filas afectadas
    }

    // Eliminar una unidad
    export const deleteUnit = async(unidad_id) =>{
        const [result] = await db.query('DELETE FROM Unidades WHERE unidad_id = ?', [unidad_id]);
        return result.affectedRows; // Devuelve el número de filas afectadas
    }

