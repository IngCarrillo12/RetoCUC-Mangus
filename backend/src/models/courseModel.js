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
        descripcion_link,
        publico_objetivo,
        storytelling_problema,
        storytelling_solucion,
        storytelling_final,
        palabras_clave,
        usuario_id,
        estado = "borrador",
    } = curso;
    const [result] = await db.query(
        `INSERT INTO Cursos (titulo, categoria, programa, descripcion_larga, descripcion_corta, resultados_aprendizaje, duracion, descripcion_link, publico_objetivo, storytelling_problema, storytelling_solucion, storytelling_final, palabras_clave, usuario_id, estado, fecha_creacion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
            titulo,
            categoria,
            programa,
            descripcion_larga,
            descripcion_corta,
            resultados_aprendizaje,
            duracion,
            descripcion_link,
            publico_objetivo,
            storytelling_problema,
            storytelling_solucion,
            storytelling_final,
            palabras_clave,
            usuario_id,
            estado
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
        programa,
        descripcion_larga,
        descripcion_corta,
        resultados_aprendizaje,
        duracion,
        descripcion_link,
        publico_objetivo,
        storytelling_problema,
        storytelling_solucion,
        storytelling_final,
        palabras_clave,
        usuario_id,
        estado
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
        descripcion_link  = ?,
        publico_objetivo  = ?, 
        storytelling_problema  = ?,
        storytelling_solucion  = ?,
        storytelling_final  = ?,
        palabras_clave  = ?,
        usuario_id  = ?,
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
            descripcion_link,
            publico_objetivo,
            storytelling_problema,
            storytelling_solucion,
            storytelling_final,
            palabras_clave,
            usuario_id,
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
            c.descripcion_link AS curso_descripcion_link,
            c.publico_objetivo AS curso_publico_objetivo,
            c.storytelling_problema AS curso_storytelling_problema,
            c.storytelling_solucion AS curso_storytelling_solucion ,
            c.storytelling_final AS curso_storytelling_final,
            c.palabras_clave AS curso_palabras_clave,
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
export const getCoursesWithDetailsByUserIdModel = async (usuario_id) => {
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
            c.descripcion_link AS curso_descripcion_link,
            c.publico_objetivo AS curso_publico_objetivo,
            c.storytelling_problema AS curso_storytelling_problema,
            c.storytelling_solucion AS curso_storytelling_solucion ,
            c.storytelling_final AS curso_storytelling_final,
            c.palabras_clave AS curso_palabras_clave,
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
            c.usuario_id = ?
        ORDER BY 
            c.id, u.id, l.id, r.id
        `,
        [usuario_id]
    );

    // Reestructurar los datos para anidar la información de forma jerárquica
    const cursosMap = new Map();

    rows.forEach((row) => {
        // Crear o actualizar el curso
        if (!cursosMap.has(row.curso_id)) {
            cursosMap.set(row.curso_id, {
                id: row.curso_id,
                titulo: row.curso_titulo,
                categoria: row.curso_categoria,
                programa: row.curso_programa,
                descripcion_larga: row.curso_descripcion_larga,
                descripcion_corta: row.curso_descripcion_corta,
                resultados_aprendizaje: row.curso_resultados_aprendizaje,
                duracion: row.curso_duracion,
                estado: row.curso_estado,
                fecha_creacion: row.curso_fecha_creacion,
                descripcion_link: row.descripcion_link,
                publico_objetivo: row.publico_objetivo,
                storytelling_problema: row. storytelling_problema,
                storytelling_solucion: row.storytelling_solucion,
                storytelling_final: row.storytelling_final,
                palabras_clave: row.palabras_clave,
                fecha_creacion: row.curso_fecha_creacion,
                unidades: []
            });
        }

        const curso = cursosMap.get(row.curso_id);

        // Crear o actualizar la unidad
        if (row.unidad_id) {
            let unidad = curso.unidades.find((u) => u.id === row.unidad_id);
            if (!unidad) {
                unidad = {
                    id: row.unidad_id,
                    titulo: row.unidad_titulo,
                    descripcion: row.unidad_descripcion,
                    lecciones: []
                };
                curso.unidades.push(unidad);
            }

            // Crear o actualizar la lección
            if (row.leccion_id) {
                let leccion = unidad.lecciones.find((l) => l.id === row.leccion_id);
                if (!leccion) {
                    leccion = {
                        id: row.leccion_id,
                        titulo: row.leccion_titulo,
                        tematicas: row.leccion_tematicas,
                        resultados_aprendizaje: row.leccion_resultados_aprendizaje,
                        tipo: row.leccion_tipo,
                        caracteristicas: row.leccion_caracteristicas,
                        proposito: row.leccion_proposito,
                        duracion: row.leccion_duracion,
                        descripcion_link: row.descripcion_link,
                        publico_objetivo: row.publico_objetivo,
                        storytelling_problema: row. storytelling_problema,
                        storytelling_solucion: row.storytelling_solucion,
                        storytelling_final: row.storytelling_final,
                        palabras_clave: row.palabras_clave,
                        fecha_creacion: row.curso_fecha_creacion,
                        semana_sugerida: row.leccion_semana_sugerida,
                        recursos: []
                    };
                    unidad.lecciones.push(leccion);
                }

                // Agregar recurso
                if (row.recurso_id) {
                    leccion.recursos.push({
                        id: row.recurso_id,
                        tipo: row.recurso_tipo,
                        nombre: row.recurso_nombre,
                        url: row.recurso_url
                    });
                }
            }
        }
    });

    return Array.from(cursosMap.values()); // Devuelve los cursos como un array
};



