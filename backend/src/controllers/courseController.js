import {createCourseModel, getCourseByIdModel, getCoursesByUserIdModel, updateCourseModel,deleteCourseModel, getCourseWithDetailsModel, getCoursesWithDetailsByUserIdModel, } from '../models/courseModel.js'
import {createUnitModel, updateUnitModel, deleteUnitModel, getUnitsByCourseIdModel} from '../models/unitModel.js';
import {createLessonModel, updateLessonModel, deleteLessonModel, getLessonsByUnitIdModel} from '../models/lessonModel.js';
import {createResourceModel, updateResourceModel, deleteResourceModel, getResourcesByLessonIdModel} from '../models/resourceModel.js';

export const updateGroup = async (req, res) => {
    const { course } = req.body;
    const curso = course;

    try {
        // Validar que el curso tenga un ID
        if (!curso.id) {
            return res.status(400).json({ message: 'El ID del curso es requerido para actualizar el grupo.' });
        }
        if (!curso.usuario_id) {
            return res.status(400).json({ message: 'El usuario_id es obligatorio.' });
        }

        // Actualizar el curso
        const updatedRows = await updateCourseModel(curso.id, curso);
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }

        // Obtener las unidades actuales de la base de datos
        const unidadesExistentes = await getUnitsByCourseIdModel(curso.id);
        const unidadesExistentesIds = unidadesExistentes.map((unidad) => unidad.id);

        // Filtrar las unidades para identificar cuáles eliminar
        const unidadesNuevasIds = curso.unidades.map((unidad) => unidad.id).filter(Boolean); // Solo IDs no nulos
        const unidadesParaEliminar = unidadesExistentesIds.filter((id) => !unidadesNuevasIds.includes(id));

        // Eliminar las unidades que ya no están en la solicitud
        for (const unidadId of unidadesParaEliminar) {
            await deleteUnitModel(unidadId);
        }

        // Procesar las unidades que permanecen o son nuevas
        for (const unidad of curso.unidades) {
            let unidadId;

            if (unidad.id) {
                // Actualizar la unidad existente
                await updateUnitModel(unidad.id, { ...unidad, curso_id: curso.id });
                unidadId = unidad.id;
            } else {
                // Crear nueva unidad si no tiene ID
                unidadId = await createUnitModel({ ...unidad, curso_id: curso.id });
            }

            // Manejar las lecciones asociadas a la unidad
            const leccionesExistentes = await getLessonsByUnitIdModel(unidadId);
            const leccionesExistentesIds = leccionesExistentes.map((leccion) => leccion.id);
            const leccionesNuevasIds = unidad.lecciones.map((leccion) => leccion.id).filter(Boolean);
            const leccionesParaEliminar = leccionesExistentesIds.filter((id) => !leccionesNuevasIds.includes(id));

            // Eliminar las lecciones que ya no están en la solicitud
            for (const leccionId of leccionesParaEliminar) {
                await deleteLessonModel(leccionId);
            }

            for (const leccion of unidad.lecciones) {
                let leccionId;

                if (leccion.id) {
                    // Actualizar la lección existente
                    await updateLessonModel(leccion.id, { ...leccion, unidad_id: unidadId });
                    leccionId = leccion.id;
                } else {
                    // Crear nueva lección si no tiene ID
                    leccionId = await createLessonModel({ ...leccion, unidad_id: unidadId });
                }

                // Manejar los recursos asociados a la lección
                const recursosExistentes = await getResourcesByLessonIdModel(leccionId);
                const recursosExistentesIds = recursosExistentes.map((recurso) => recurso.id);
                const recursosNuevosIds = leccion.recursos.map((recurso) => recurso.id).filter(Boolean);
                const recursosParaEliminar = recursosExistentesIds.filter((id) => !recursosNuevosIds.includes(id));

                // Eliminar los recursos que ya no están en la solicitud
                for (const recursoId of recursosParaEliminar) {
                    await deleteResourceModel(recursoId);
                }

                for (const recurso of leccion.recursos) {
                    if (recurso.id) {
                        // Actualizar el recurso existente
                        await updateResourceModel(recurso.id, { ...recurso, leccion_id: leccionId });
                    } else {
                        // Crear nuevo recurso si no tiene ID
                        await createResourceModel({ ...recurso, leccion_id: leccionId });
                    }
                }
            }
        }

        res.status(200).json({ message: 'Grupo actualizado con éxito.' });
    } catch (error) {
        console.error('Error al actualizar el grupo:', error);
        res.status(500).json({ message: 'Error al actualizar el grupo', error });
    }
};




export const createGroup = async (req, res) => {
    const { course } = req.body;
    const curso = course
    console.log(course)
    try {
        // Valida que el usuario_id esté presente en el cuerpo de la solicitud
        if (!curso.usuario_id) {
            return res.status(400).json({ message: 'El usuario_id es requerido para crear el curso.' });
        }

        // Crear el curso
        const cursoId = await createCourseModel(curso); // usuario_id ya se maneja en createCourseModel

        // Crear las unidades asociadas al curso, si existen
        if (curso.unidades && Array.isArray(curso.unidades)) {
            for (const unidad of curso.unidades) {
                const unidadId = await createUnitModel({ ...unidad, curso_id: cursoId });

                // Crear las lecciones asociadas a la unidad, si existen
                if (unidad.lecciones && Array.isArray(unidad.lecciones)) {
                    for (const leccion of unidad.lecciones) {
                        const leccionId = await createLessonModel({ ...leccion, unidad_id: unidadId });

                        // Crear los recursos asociados a la lección, si existen
                        if (leccion.recursos && Array.isArray(leccion.recursos)) {
                            for (const recurso of leccion.recursos) {
                                await createResourceModel({ ...recurso, leccion_id: leccionId });
                            }
                        } else {
                            // Si no hay recursos, asignamos un valor por defecto (null o cadena vacía)
                            await createResourceModel({ leccion_id: leccionId, recurso: null });
                        }
                    }
                } else {
                    // Si no hay lecciones, asignamos un valor por defecto (null o cadena vacía)
                    await createLessonModel({ unidad_id: unidadId, leccion: null });
                }
            }
        } else {
            // Si no hay unidades, asignamos un valor por defecto (null o cadena vacía)
            await createUnitModel({ curso_id: cursoId, unidad: null });
        }

        res.status(201).json({ message: 'Grupo creado con éxito' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al crear el grupo', error });
    }
};


export const createCourse = async (req, res) => {
    const {
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
        estado = "borrador"
    } = req.body;

    const usuario_id = req.user.id; 

    try {
        const cursoId = await createCourseModel(
            titulo,
            categoria,
            autor,
            programa,
            descripcion_larga,
            descripcion_corta,
            resultados_aprendizaje,
            duracion,
            estado, 
            usuario_id,
            descripcion_link,
            publico_objetivo,
            storytelling_problema,
            storytelling_solucion,
            storytelling_final,
            palabras_clave,
        );

        res.status(201).json({ message: 'Curso creado con éxito', cursoId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error });
    }
};


// Obtener un curso por ID
export const getCourseById = async (req, res) => {
    const { curso_id } = req.params;

    try {
        const curso = await getCourseByIdModel(curso_id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el curso', error });
    }
};


// Eliminar un curso
export const deleteCourse = async (req, res) => {
    const { curso_id } = req.params;

    try {
        const affectedRows = await deleteCourseModel(curso_id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' });

        res.json({ message: 'Curso eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el curso', error });
    }
};

// Obtener todos los cursos de un usuario
export const getCoursesByUserId = async (req, res) => {
    const usuario_id = req.user.id; // Obtenido del token JWT

    try {
        const cursos = await getCoursesByUserIdModel(usuario_id);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
};

export const getCourseWithDetails = async (req, res) => {
    const { cursoId } = req.params;

    try {
        // Llamar al modelo para obtener los datos del curso y sus relaciones
        const rows = await getCourseWithDetailsModel(cursoId);

        // Verificar si se encontró el curso
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Procesar los datos para estructurarlos en un formato jerárquico
        const course = {
            id: rows[0].curso_id,
            titulo: rows[0].curso_titulo,
            categoria: rows[0].curso_categoria,
            programa: rows[0].curso_programa,
            descripcion_larga: rows[0].curso_descripcion_larga,
            descripcion_corta: rows[0].curso_descripcion_corta,
            resultados_aprendizaje: rows[0].curso_resultados_aprendizaje,
            duracion: rows[0].curso_duracion,
            estado: rows[0].curso_estado,
            fecha_creacion: rows[0].curso_fecha_creacion,
            descripcion_link: rows[0].descripcion_link,
            publico_objetivo: rows[0].publico_objetivo,
            storytelling_problema: rows[0]. storytelling_problema,
            storytelling_solucion: rows[0].storytelling_solucion,
            storytelling_final: rows[0].storytelling_final,
            palabras_clave: rows[0].palabras_clave,
            unidades: [],
        };

        const unidadesMap = new Map();

        rows.forEach((row) => {
            if (row.unidad_id && !unidadesMap.has(row.unidad_id)) {
                unidadesMap.set(row.unidad_id, {
                    id: row.unidad_id,
                    titulo: row.unidad_titulo,
                    descripcion: row.unidad_descripcion,
                    lecciones: [],
                });
            }

            const unidad = unidadesMap.get(row.unidad_id);

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
                        semana_sugerida: row.leccion_semana_sugerida,
                        recursos: [],
                    };
                    unidad.lecciones.push(leccion);
                }

                if (row.recurso_id) {
                    leccion.recursos.push({
                        id: row.recurso_id,
                        tipo: row.recurso_tipo,
                        nombre: row.recurso_nombre,
                        url: row.recurso_url,
                    });
                }
            }
        });

        course.unidades = Array.from(unidadesMap.values());

        // Responder con los datos estructurados
        res.status(200).json(course);
    } catch (error) {
        console.error('Error al obtener el curso con detalles:', error);
        res.status(500).json({ message: 'Error al obtener el curso con detalles', error });
    }
}


export const getCoursesWithDetailsByUserId = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const cursos = await getCoursesWithDetailsByUserIdModel(usuario_id);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos con detalles', error });
    }
};
