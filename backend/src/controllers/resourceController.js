import { createResourceModel, deleteResourceModel, getResourceByIdModel, getResourcesByLessonIdModel, updateResourceModel } from '../models/resourceModel.js'
import { getLessonByIdModel } from '../models/lessonModel.js';

// Crear un nuevo recurso
export const createResource = async (req, res) => {
    const { leccion_id } = req.params;
    const { tipo, nombre, url } = req.body;

    try {
        // Validar que la lección existe
        const leccion = await getLessonByIdModel(leccion_id);
        if (!leccion) return res.status(404).json({ message: 'Lección no encontrada' });

        // Crear el recurso
        const recursoId = await createResourceModel({ leccion_id, tipo, nombre, url });
        res.status(201).json({ message: 'Recurso creado con éxito', recursoId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el recurso', error });
    }
};

// Obtener todos los recursos de una lección
export const getResourcesByLessonId = async (req, res) => {
    const { leccion_id } = req.params;

    try {
        const recursos = await getResourcesByLessonIdModel(leccion_id);
        res.json(recursos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los recursos', error });
    }
};

// Obtener un recurso por ID
export const getResourceById = async (req, res) => {
    const { recurso_id } = req.params;

    try {
        const recurso = await getResourceByIdModel(recurso_id);
        if (!recurso) return res.status(404).json({ message: 'Recurso no encontrado' });

        res.json(recurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el recurso', error });
    }
};

// Actualizar un recurso
export const updateResource = async (req, res) => {
    const { recurso_id } = req.params;
    const { tipo, nombre, url } = req.body;

    try {
        const affectedRows = await updateResourceModel(recurso_id, { tipo, nombre, url });
        if (affectedRows === 0) return res.status(404).json({ message: 'Recurso no encontrado' });

        res.json({ message: 'Recurso actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el recurso', error });
    }
};

// Eliminar un recurso
export const deleteResource = async (req, res) => {
    const { recurso_id } = req.params;

    try {
        const affectedRows = await deleteResourceModel(recurso_id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Recurso no encontrado' });

        res.json({ message: 'Recurso eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el recurso', error });
    }
};
