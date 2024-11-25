import { create } from "zustand";
import { fetchLoadCourses} from "../api/CourseApi";

export const useCourseStore = create((set, get) => ({
  courses: [],
  loading:true,
  error: null,
  currentCourse: null, 

  loadCourses: async(usuario_id) => {
    set({ loading: true, error: null }); 
    try {
      const dataCourses =  await fetchLoadCourses(usuario_id)
      set((state) => ({
        ...state, 
        courses: [...dataCourses],
        loading: false, 
        error: null, 
      }));
    } catch (error) {
      
      set({ loading: false, error: error.message || "Error al cargar cursos" });
      console.error(error); 
    }
  },
   
  addCourse: (course) =>
    set((state) => ({
      courses: [
        ...state.courses,
        {
          id: Date.now(),
          ...course,
          units: [],
        },
      ],
    })),

  editCourse: (courseId, updatedData) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId ? { ...course, ...updatedData } : course
      ),
    })),


  deleteCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== courseId),
    })),


}));

