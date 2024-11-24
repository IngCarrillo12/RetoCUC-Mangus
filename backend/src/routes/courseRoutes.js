import express from 'express';
import {
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesByUserId,
    getCourseById,
    createGroup,
    getCourseWithDetails
} from '../controllers/courseController.js'

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createCourse); // Crear curso
router.get('/:curso_id', authenticateToken, getCourseById); // Obtener curso por ID
router.put('/:curso_id', authenticateToken, updateCourse); // Actualizar curso
router.delete('/:curso_id', authenticateToken, deleteCourse); // Eliminar curso
router.get('/', authenticateToken, getCoursesByUserId); // Obtener todos los cursos de un usuario
router.post('/complete', authenticateToken, createGroup)
router.get('/cursoComplete/:cursoId', getCourseWithDetails);
export default router
