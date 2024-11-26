import express from 'express';
import { createFeedback, getFeedbackByCourseId, getFeedbackById } from '../controllers/feedbackController.js';

const router = express.Router();

// Ruta para crear un feedback
router.post('/:curso_id', createFeedback);

// Ruta para obtener feedbacks por curso
router.get('/:curso_id', getFeedbackByCourseId);

// Ruta para obtener feedback por ID
router.get('/:feedback_id', getFeedbackById);

export default router;