import express from 'express';
import {
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCoursesByUserId
} from '../models/courseModel.js'

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/courses', authenticateToken, createCourse); // Crear curso
router.get('/courses/:curso_id', authenticateToken, getCourseById); // Obtener curso por ID
router.put('/courses/:curso_id', authenticateToken, updateCourse); // Actualizar curso
router.delete('/courses/:curso_id', authenticateToken, deleteCourse); // Eliminar curso
router.get('/courses', authenticateToken, getCoursesByUserId); // Obtener todos los cursos de un usuario

export default router
