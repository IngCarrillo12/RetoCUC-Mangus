import {createCourseModel, getCourseByIdModel, getCoursesByUserIdModel, updateCourseModel,deleteCourseModel, getCourseWithDetailsModel, getCoursesWithDetailsByUserIdModel} from '../models/courseModel.js'
import {createUnitModel} from '../models/unitModel.js';
import {createLessonModel} from '../models/lessonModel.js';
import {createResourceModel} from '../models/resourceModel.js';


export const createGroup = async (req, res) => {
    const { curso } = req.body;

    try {
        // Valida que el usuario_id esté presente en el cuerpo de la solicitud
        if (!curso.usuario_id) {
            return res.status(400).json({ message: 'El usuario_id es requerido para crear el curso.' });
        }

        // Crear el curso
        const cursoId = await createCourseModel(curso); // usuario_id ya se maneja en createCourseModel

        // Crear las unidades asociadas al curso
        for (const unidad of curso.unidades) {
            const unidadId = await createUnitModel({ ...unidad, curso_id: cursoId });

            // Crear las lecciones asociadas a la unidad
            for (const leccion of unidad.lecciones) {
                const leccionId = await createLessonModel({ ...leccion, unidad_id: unidadId });

                // Crear los recursos asociados a la lección
                for (const recurso of leccion.recursos) {
                    await createResourceModel({ ...recurso, leccion_id: leccionId });
                }
            }
        }

        res.status(201).json({ message: 'Grupo creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el grupo', error });
    }
};
// Crear un nuevo curso
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
        estado = "borrador"
    } = req.body;

    const usuario_id = req.user.id; // Obtenido del token

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
            usuario_id
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

// Actualizar un curso
export const updateCourse = async (req, res) => {
    const { curso_id } = req.params;
    const { titulo, descripcion, estado } = req.body;

    try {
        const affectedRows = await updateCourseModel(curso_id, titulo, descripcion, estado);
        if (affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' });

        res.json({ message: 'Curso actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el curso', error });
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




