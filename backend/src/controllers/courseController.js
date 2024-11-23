import Course from '../models/courseModel.js'

// Crear un nuevo curso
export const createCourse = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const usuario_id = req.user.id;

    try {
        const cursoId = await Course.createCourse(titulo, descripcion, usuario_id);
        res.status(201).json({ message: 'Curso creado con éxito', cursoId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error });
    }
};

// Obtener un curso por ID
export const getCourseById = async (req, res) => {
    const { curso_id } = req.params;

    try {
        const curso = await Course.getCourseById(curso_id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el curso', error });
    }
};

// Actualizar un curso
export const updateCourse = async (req, res) => {
    const { curso_id } = req.params;
    const { titulo, descripcion, estado } = req.body;

    try {
        const affectedRows = await Course.updateCourse(curso_id, titulo, descripcion, estado);
        if (affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' });

        res.json({ message: 'Curso actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el curso', error });
    }
};

// Eliminar un curso
export const deleteCourse = async (req, res) => {
    const { curso_id } = req.params;

    try {
        const affectedRows = await Course.deleteCourse(curso_id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' });

        res.json({ message: 'Curso eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el curso', error });
    }
};

// Obtener todos los cursos de un usuario
export const getCoursesByUserId = async (req, res) => {
    const usuario_id = req.user.id; // Obtenido del token JWT

    try {
        const cursos = await Course.getCoursesByUserId(usuario_id);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
};
