import db from '../configDB/db.js';


export const createCourseModel = async (curso) => {
    const {
        titulo,
        categoria,
        programa,
        descripcion_larga,
        descripcion_corta,
        resultados_aprendizaje,
        duracion,
        usuario_id, 
    } = curso;

    const [result] = await db.query(
        `INSERT INTO Cursos (titulo, categoria, programa, descripcion_larga, descripcion_corta, resultados_aprendizaje, duracion, usuario_id, estado, fecha_creacion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'creado' , NOW())`,
        [
            
            titulo,
            categoria,
            programa,
            descripcion_larga,
            descripcion_corta,
            resultados_aprendizaje,
            duracion,
            usuario_id,
        ]
    );
    return result.insertId; // Devuelve el ID del curso creado
};

// Obtener un curso por ID
export const getCourseByIdModel = async (curso_id) => {
    const [rows] = await db.query('SELECT * FROM Cursos WHERE id = ?', [curso_id]);
    return rows[0]; // Devuelve el primer registro o undefined si no existe
};

// Actualizar un curso
export const updateCourseModel = async (curso_id, curso) => {
    const {
        titulo,
        categoria,
        autor,
        programa,
        descripcion_larga,
        descripcion_corta,
        resultados_aprendizaje,
        duracion,
        estado,
    } = curso;

    const [result] = await db.query(
        `UPDATE Cursos SET 
        titulo = ?, 
        categoria = ?, 
        autor = ?, 
        programa = ?, 
        descripcion_larga = ?, 
        descripcion_corta = ?, 
        resultados_aprendizaje = ?, 
        duracion = ?, 
        estado = ? 
        WHERE id = ?`,
        [
            titulo,
            categoria,
            autor,
            programa,
            descripcion_larga,
            descripcion_corta,
            resultados_aprendizaje,
            duracion,
            estado,
            curso_id,
        ]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
};

// Eliminar un curso
export const deleteCourseModel = async (curso_id) => {
    const [result] = await db.query('DELETE FROM Cursos WHERE id = ?', [curso_id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
};

// Obtener todos los cursos de un usuario
export const getCoursesByUserIdModel = async (usuario_id) => {
    const [rows] = await db.query('SELECT * FROM Cursos WHERE usuario_id = ?', [usuario_id]);
    return rows; // Devuelve todos los cursos de un usuario
};

// Obtener un curso con detalles (unidades, lecciones y recursos)

export const getCourseWithDetailsModel = async (cursoId) => {
    const [rows] = await db.query(
        `
        SELECT 
            c.id AS curso_id,
            c.titulo AS curso_titulo,
            c.categoria AS curso_categoria,
            c.programa AS curso_programa,
            c.descripcion_larga AS curso_descripcion_larga,
            c.descripcion_corta AS curso_descripcion_corta,
            c.resultados_aprendizaje AS curso_resultados_aprendizaje,
            c.duracion AS curso_duracion,
            c.estado AS curso_estado,
            c.fecha_creacion AS curso_fecha_creacion,
            u.id AS unidad_id,
            u.titulo AS unidad_titulo,
            u.descripcion AS unidad_descripcion,
            l.id AS leccion_id,
            l.titulo AS leccion_titulo,
            l.tematicas AS leccion_tematicas,
            l.resultados_aprendizaje AS leccion_resultados_aprendizaje,
            l.tipo AS leccion_tipo,
            l.caracteristicas AS leccion_caracteristicas,
            l.proposito AS leccion_proposito,
            l.duracion AS leccion_duracion,
            l.semana_sugerida AS leccion_semana_sugerida,
            r.id AS recurso_id,
            r.tipo AS recurso_tipo,
            r.nombre AS recurso_nombre,
            r.url AS recurso_url
        FROM 
            Cursos c
        LEFT JOIN 
            Unidades u ON c.id = u.curso_id
        LEFT JOIN 
            Lecciones l ON u.id = l.unidad_id
        LEFT JOIN 
            Recursos r ON l.id = r.leccion_id
        WHERE 
            c.id = ?
        `,
        [cursoId]
    );

    return rows;
};


