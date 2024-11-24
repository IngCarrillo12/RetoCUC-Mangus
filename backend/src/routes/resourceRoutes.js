import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
    createResource,
    getResourcesByLessonId,
    getResourceById,
    updateResource,
    deleteResource
} from '../controllers/resourceController.js';



const router = express.Router();

router.post('/lessons/:leccion_id/resources', authenticateToken, createResource); // Crear recurso en una lección
router.get('/lessons/:leccion_id/resources', authenticateToken, getResourcesByLessonId); // Obtener recursos de una lección
router.get('/resources/:recurso_id', authenticateToken, getResourceById); // Obtener recurso por ID
router.put('/resources/:recurso_id', authenticateToken, updateResource); // Actualizar recurso
router.delete('/resources/:recurso_id', authenticateToken, deleteResource); // Eliminar recurso

module.exports = router;
