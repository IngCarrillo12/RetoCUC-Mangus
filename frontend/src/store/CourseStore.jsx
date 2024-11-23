import { create } from "zustand";

export const useCourseStore = create((set, get) => ({
  courses: [],
  currentCourse: null, 

  // Agregar un curso
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

