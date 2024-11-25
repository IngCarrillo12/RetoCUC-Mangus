import axios from "axios"

const urlApi = 'http://localhost:3000/api/courses'
export const fetchLoadCourses = async(usuario_id)=>{
    const token = localStorage.getItem('token'); // O úsalo desde tu store global
    try {
        const { data } = await axios.get(
            `${urlApi}/details/${usuario_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}` // Incluye el token aquí
                },
                withCredentials: true // Solo si necesitas enviar cookies también
            }
        );
        return data;
    } catch (error) {
        console.error(`Error al cargar cursos: ${error}`);
        return error;
    }
}

