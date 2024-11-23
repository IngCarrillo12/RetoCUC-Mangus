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


  addUnit: (courseId, unit) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              units: [
                ...course.units,
                {
                  id: Date.now(),
                  ...unit,
                  lessons: [],
                },
              ],
            }
          : course
      ),
    })),

  // Agregar una lección a una unidad
  addLesson: (courseId, unitId, lesson) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              units: course.units.map((unit) =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: [
                        ...unit.lessons,
                        { id: Date.now(), ...lesson, resources: [] },
                      ],
                    }
                  : unit
              ),
            }
          : course
      ),
    })),

  // Agregar un recurso a una lección
  addResource: (courseId, unitId, lessonId, resource) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              units: course.units.map((unit) =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: unit.lessons.map((lesson) =>
                        lesson.id === lessonId
                          ? {
                              ...lesson,
                              resources: [...lesson.resources, resource],
                            }
                          : lesson
                      ),
                    }
                  : unit
              ),
            }
          : course
      ),
    })),
}));

