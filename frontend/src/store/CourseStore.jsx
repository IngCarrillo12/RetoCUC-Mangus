import { create } from "zustand";
import { fetchAddCourse, fetchLoadCourses, fetchUpdateGroup} from "../api/CourseApi.jsx";


export const useCourseStore = create((set, get) => ({
  courses: [],
  loading:true,
  error: null,
  currentCourse: null, 

  loadCourses: async(usuario_id) => {
    set({ loading: true, error: null }); 
    console.log('entro')
    const result = await fetchLoadCourses(usuario_id);
    console.log(result)
    if (result.error) {
        set({ loading: false, error: result.error});
    } else {
        set({
            courses: result.data,
            loading: false,
            error: null
        });
    }
    },

   
  addCourse: async(course) =>{
      const {message} = await fetchAddCourse(course)
      set((state) => ({
        courses: [
          ...state.courses,
          {
            ...course,
          },
        ],
      }))
      set({
        error: message
    });


  },

  editCourse: async (courseId, updatedData) => {
    console.log(courseId)
  try {
    const course = { id: courseId, ...updatedData };
    const response = await fetchUpdateGroup(course); // Llama a la API para actualizar

    if (response.error) {
      console.error('Error al actualizar el curso:', response.error);
      return { error: response.error };
    }

    // Actualiza el curso directamente en el estado global
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

