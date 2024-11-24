import db from '../configDB/db.js'


    export const createCourse = async(titulo, descripcion, usuario_id) =>{
        const [result] = await db.query(
            'INSERT INTO Cursos (titulo, descripcion, usuario_id, estado, fecha_creacion) VALUES (?, ?, ?, "En creación", NOW())',
            [titulo, descripcion, usuario_id]
        );
        return result.insertId;
    }

    // Obtener un curso por ID
     export const getCourseById = async(curso_id) => {
        const [rows] = await db.query('SELECT * FROM Cursos WHERE curso_id = ?', [curso_id]);
        return rows[0]; // Devuelve el primer registro o undefined si no existe
    }

    // Actualizar un curso
    export const updateCourse = async(curso_id, titulo, descripcion, estado) =>{
        const [result] = await db.query(
            'UPDATE Cursos SET titulo = ?, descripcion = ?, estado = ? WHERE curso_id = ?',
            [titulo, descripcion, estado, curso_id]
        );
        return result.affectedRows; // Devuelve el número de filas afectadas
    }

    // Eliminar un curso
    export const deleteCourse = async(curso_id)=> {
        const [result] = await db.query('DELETE FROM Cursos WHERE curso_id = ?', [curso_id]);
        return result.affectedRows; // Devuelve el número de filas afectadas
    }

    // Obtener todos los cursos de un usuario
    export const getCoursesByUserId = async(usuario_id) =>{
        const [rows] = await db.query('SELECT * FROM Cursos WHERE usuario_id = ?', [usuario_id]);
        return rows; // Devuelve todos los cursos de un usuario
    }

  export const getCourseWithDetails = async(curso_id) => {
        const [rows] = await db.query(`
            SELECT c.*, u.unidad_id, u.titulo AS unidad_titulo, l.leccion_id, l.titulo AS leccion_titulo, r.recurso_id, r.tipo, r.nombre
            FROM Cursos c
            LEFT JOIN Unidades u ON c.curso_id = u.curso_id
            LEFT JOIN Lecciones l ON u.unidad_id = l.unidad_id
            LEFT JOIN Recursos r ON l.leccion_id = r.leccion_id
            WHERE c.curso_id = ?
        `, [curso_id]);
        return rows;
    }
