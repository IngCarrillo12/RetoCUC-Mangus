import { createFeedbackModel, getFeedbackByCourseIdModel, getFeedbackByIdModel }from '../models/feedbackModel.js';
import { getCourseByIdModel,} from '../models/courseModel.js';

// Crear un nuevo feedback
export const createFeedback = async (req, res) => {
    const { curso_id } = req.params;
    const { comentario, admin_id } = req.body;    
    
    try {
        const curso = await getCourseByIdModel(curso_id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        const feedbackId = await createFeedbackModel({ curso_id, admin_id, comentario });        
        res.status(201).json({ message: 'Feedback creado con éxito', feedbackId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el feedback', error });
    }
};

export const getFeedbackByCourseId = async (req, res) => {
    const { curso_id } = req.params;

    try {
        const feedbacks = await getFeedbackByCourseIdModel(curso_id);
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los feedbacks', error });
    }
};

export const getFeedbackById = async (req, res) => {
    const { feedback_id } = req.params;

    try {
        const feedback = await getFeedbackByIdModel(feedback_id);
        if (!feedback) return res.status(404).json({ message: 'Feedback no encontrado' });

        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el feedback', error });
    }
};
