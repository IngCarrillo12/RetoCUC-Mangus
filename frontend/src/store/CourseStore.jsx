import { create } from "zustand";
import { fetchAddCourse, fetchLoadCourses, fetchUpdateGroup} from "../api/CourseApi.jsx";


export const useCourseStore = create((set, get) => ({
  courses: [],
  loading:true,
  error: null,
  currentCourse: null, 
  setCurrentCourse: (course) => set({ currentCourse: course }),
  loadCourses: async(usuario_id) => {
    set({ loading: true, error: null }); 

    const result = await fetchLoadCourses(usuario_id);
    if (result.error) {
        set({ loading: false, error: result.error});
    } else {
        set({
            courses: result.data,
            currentCourse:result.data,  
            loading: false,
            error: null
        });
    }
    },

   
  addCourse: async(course) =>{
    try {
      const {message} = await fetchAddCourse(course)
      set((state) => ({
        courses: [
          ...state.courses,
          {
            ...course,
          },
        ],
      }))
      console.log(message)
    } catch (error) {
      console.log(error.message)
    }
  },

  editCourse: async (courseId, updatedData) => {
    try {
        // Combina el ID del curso con los datos actualizados
        const course = { id: courseId, ...updatedData };
        console.log(updatedData)
        // Llama a la API para actualizar el curso
        const response = await fetchUpdateGroup(course);

        if (response.error) {
            console.error('Error al actualizar el curso:', response.error);
            return { error: response.error };
        }

        // Actualiza el estado local si la API responde con éxito
        set((state) => ({
            courses: state.courses.map((c) =>
                c.id === courseId ? { ...c, ...updatedData } : c
            ),
        }));

        return { success: true, data: response };
    } catch (error) {
        console.error('Error inesperado al actualizar el curso:', error);
        return { error: 'Error inesperado al actualizar el curso' };
    }
},


  deleteCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== courseId),
    })),


}));

