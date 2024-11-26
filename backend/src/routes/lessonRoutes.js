import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
    createLesson,
    getLessonsByUnitId,
    getLessonById,
    // updateLesson,
    deleteLesson
} from '../controllers/lessonController.js';



const router = express.Router();

router.post('/units/:unidad_id/lessons', authenticateToken, createLesson); // Crear lección en una unidad
router.get('/units/:unidad_id/lessons', authenticateToken, getLessonsByUnitId); // Obtener lecciones de una unidad
router.get('/lessons/:leccion_id', authenticateToken, getLessonById); // Obtener lección por ID
// router.put('/lessons/:leccion_id', authenticateToken, updateLesson); // Actualizar lección
router.delete('/lessons/:leccion_id', authenticateToken, deleteLesson); // Eliminar lección

export default router;
