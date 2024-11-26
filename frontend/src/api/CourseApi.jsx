import axios from "axios"

const urlApi = 'http://localhost:3000/api/courses'

export const fetchLoadCourses = async (usuario_id) => {
    try {
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) {
            throw new Error('No se encontró información de autenticación en el almacenamiento local');
        }

        const { state } = JSON.parse(authStorage);

        // Construye la URL según el rol del usuario
        const endpoint = state?.user.rol === 'docente' 
            ? `${urlApi}/details/${usuario_id}` 
            : `${urlApi}/all`;

        // Realiza la solicitud GET
        const { data } = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${state.token}`
            },
            withCredentials: true,
        });

        return { data };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error desconocido al cargar cursos';
        console.error('Error al cargar cursos:', errorMessage);
        return { error: errorMessage };
    }
};

export const fetchAddCourse = async(course)=>{
    try {
        const { state } = await JSON.parse(localStorage.getItem('auth-storage')); 
        const { data } = await axios.post(
            `${urlApi}/create`, {course},
            {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
                withCredentials: true 
            }
        );
        return data;
    } catch (error) {
        return error
    }
}
export const fetchUpdateGroup = async (course) => {
    console.log(course)
    try {
        // Obtiene el token del almacenamiento local
        const { state } = await JSON.parse(localStorage.getItem('auth-storage'));

        // Realiza la solicitud PUT a la API
        const { data } = await axios.put(
            `${urlApi}/update/${course.id}`, // Usa el ID del curso para la URL
            { course }, // Cuerpo de la solicitud
            {
                headers: {
                    Authorization: `Bearer ${state.token}`, // Autenticación con JWT
                },
                withCredentials: true, // Si se usan cookies
            }
        );

        return data; // Devuelve la respuesta de la API
    } catch ({ response }) {
        // Manejo de errores
        return { error: response?.data?.message || 'Error al actualizar el grupo' };
    }
};


