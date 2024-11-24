
import { createLessonModel, deleteLessonModel, getLessonByIdModel, getLessonsByUnitIdModel, updateLessonModel } from '../models/lessonModel.js'
import { getUnitByIdModel } from '../models/unitModel.js';
// Crear una nueva lección
export const createLesson = async (req, res) => {
    const { unidad_id } = req.params;
    const {
        titulo,
        tematicas,
        resultados_aprendizaje,
        tipo,
        caracteristicas,
        proposito,
        duracion,
        semana_sugerida
    } = req.body;

    try {
        // Validar que la unidad existe
        const unidad = await getUnitByIdModel(unidad_id);
        if (!unidad) return res.status(404).json({ message: 'Unidad no encontrada' });

        // Crear la lección
        const leccionId = await createLessonModel({
            unidad_id,
            titulo,
            tematicas,
            resultados_aprendizaje,
            tipo,
            caracteristicas,
            proposito,
            duracion,
            semana_sugerida
        });

        res.status(201).json({ message: 'Lección creada con éxito', leccionId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la lección', error });
    }
};

// Obtener todas las lecciones de una unidad
export const getLessonsByUnitId = async (req, res) => {
    const { unidad_id } = req.params;

    try {
        const lecciones = await getLessonsByUnitIdModel(unidad_id);
        res.json(lecciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las lecciones', error });
    }
};

// Obtener una lección por ID
export const getLessonById = async (req, res) => {
    const { leccion_id } = req.params;

    try {
        const leccion = await getLessonByIdModel(leccion_id);
        if (!leccion) return res.status(404).json({ message: 'Lección no encontrada' });

        res.json(leccion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lección', error });
    }
};

// Actualizar una lección
export const updateLesson = async (req, res) => {
    const { leccion_id } = req.params;
    const {
        titulo,
        tematicas,
        resultados_aprendizaje,
        tipo,
        caracteristicas,
        proposito,
        duracion,
        semana_sugerida
    } = req.body;

    try {
        const affectedRows = await updateLessonModel(leccion_id, {
            titulo,
            tematicas,
            resultados_aprendizaje,
            tipo,
            caracteristicas,
            proposito,
            duracion,
            semana_sugerida
        });

        if (affectedRows === 0) return res.status(404).json({ message: 'Lección no encontrada' });

        res.json({ message: 'Lección actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la lección', error });
    }
};

// Eliminar una lección
export const deleteLesson = async (req, res) => {
    const { leccion_id } = req.params;

    try {
        const affectedRows = await deleteLessonModel(leccion_id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Lección no encontrada' });

        res.json({ message: 'Lección eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la lección', error });
    }
};
