import { createUnitModel, deleteUnitModel, getUnitByIdModel, getUnitsByCourseIdModel, updateUnitModel } from '../models/unitModel.js';
import { getCourseByIdModel } from '../models/courseModel.js'

// Crear una nueva unidad
export const createUnit = async (req, res) => {
    const { curso_id } = req.params; // ID del curso al que pertenece la unidad
    const { titulo, descripcion } = req.body;

    try {
        // Validar que el curso existe
        const curso = await getCourseByIdModel(curso_id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        // Validar que el curso no esté en estado "Confirmado"
        if (curso.estado === 'Confirmado') {
            return res
                .status(403)
                .json({ message: 'No se pueden agregar unidades a un curso confirmado' });
        }

        // Crear la unidad
        const unidadId = await createUnitModel({ curso_id, titulo, descripcion });
        res.status(201).json({ message: 'Unidad creada con éxito', unidadId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la unidad', error });
    }
};

// Obtener todas las unidades de un curso
export const getUnitsByCourseId = async (req, res) => {
    const { curso_id } = req.params;

    try {
        const unidades = await getUnitsByCourseIdModel(curso_id);
        res.json(unidades);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las unidades', error });
    }
};

// Obtener una unidad por ID
export const getUnitById = async (req, res) => {
    const { unidad_id } = req.params;

    try {
        const unidad = await getUnitByIdModel(unidad_id);
        if (!unidad) return res.status(404).json({ message: 'Unidad no encontrada' });

        res.json(unidad);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la unidad', error });
    }
};

// Actualizar una unidad
export const updateUnit = async (req, res) => {
    const { unidad_id } = req.params;
    const { titulo, descripcion } = req.body;

    try {
        const affectedRows = await updateUnitModel(unidad_id, titulo, descripcion);
        if (affectedRows === 0) return res.status(404).json({ message: 'Unidad no encontrada' });

        res.json({ message: 'Unidad actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la unidad', error });
    }
};

// Eliminar una unidad
export const deleteUnit = async (req, res) => {
    const { unidad_id } = req.params;

    try {
        const affectedRows = await deleteUnitModel(unidad_id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Unidad no encontrada' });

        res.json({ message: 'Unidad eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la unidad', error });
    }
};
