import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const {
    createUnit,
    getUnitsByCourseId,
    getUnitById,
    updateUnit,
    deleteUnit
} = require('../controllers/unitController');


const router = express.Router();

router.post('/courses/:curso_id/units', authenticateToken, createUnit); // Crear unidad en un curso
router.get('/courses/:curso_id/units', authenticateToken, getUnitsByCourseId); // Obtener unidades de un curso
router.get('/units/:unidad_id', authenticateToken, getUnitById); // Obtener unidad por ID
router.put('/units/:unidad_id', authenticateToken, updateUnit); // Actualizar unidad
router.delete('/units/:unidad_id', authenticateToken, deleteUnit); // Eliminar unidad

module.exports = router;
