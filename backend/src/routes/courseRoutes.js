import express from 'express';
import {
    createCourse,
    deleteCourse,
    getCoursesByUserId,
    getCourseById,
    createGroup,
    getCourseWithDetails,
    getCoursesWithDetailsByUserId,
    updateGroup
} from '../controllers/courseController.js'

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createCourse); // Crear curso
router.get('/:curso_id', authenticateToken, getCourseById); // Obtener curso por ID
router.put('/update/:curso_id', authenticateToken, updateGroup); // Actualizar curso
router.delete('/:curso_id', authenticateToken, deleteCourse); // Eliminar curso
router.get('/', authenticateToken, getCoursesByUserId); // Obtener todos los cursos de un usuario
router.post('/create',authenticateToken, createGroup)
router.get('/courseComplete/:cursoId', authenticateToken, getCourseWithDetails);
router.get('/details/:usuario_id',authenticateToken, getCoursesWithDetailsByUserId);
export default router
