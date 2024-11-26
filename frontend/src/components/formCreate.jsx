import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../style/formCreate.css";
import { useAuthStore } from "../store/AuthStore";

export const FormCreate = () => {
const { user} = useAuthStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      titulo: "",
      categoria: "",
      duracion: "",
      programa: "",
      descripcion_larga: "",
      descripcion_corta: "",
      resultados_aprendizaje: "",
      descripcion_link: "",
      storytelling_problema: "",
      storytelling_solucion: "",
      storytelling_final: "",
      palabras_clave: "",
      publico_objetivo: "",
      unidades: [],
    },
  });

  const { fields: unitFields, append: addUnit, remove: removeUnit, update: updateUnit } = useFieldArray({
    control,
    name: "unidades",
  });

  const [isCourseInfoCollapsed, setIsCourseInfoCollapsed] = useState(false);
  const [collapsedUnits, setCollapsedUnits] = useState({});
  const [collapsedLessons, setCollapsedLessons] = useState({});

  const toggleCourseInfo = () => {
    setIsCourseInfoCollapsed(!isCourseInfoCollapsed);
  };

  const toggleUnit = (unitIndex) => {
    setCollapsedUnits((prev) => ({
      ...prev,
      [unitIndex]: !prev[unitIndex],
    }));
  };

  const toggleLesson = (unitIndex, lessonIndex) => {
    setCollapsedLessons((prev) => ({
      ...prev,
      [`${unitIndex}-${lessonIndex}`]: !prev[`${unitIndex}-${lessonIndex}`],
    }));
  };

  const addLessonToUnit = (unitIndex) => {
    const currentLessons = unitFields[unitIndex]?.lecciones || [];
    const newLesson = {
      titulo: "",
      tematicas: "",
      resultados_aprendizaje: "",
      tipo: "",
      recursos: [],
      proposito: "",
      duracion: "",
      semana_sugerida: "",
    };

    const updatedUnit = {
      ...unitFields[unitIndex],
      lecciones: [...currentLessons, newLesson],
    };
    updateUnit(unitIndex, updatedUnit);
  };

  const removeLessonFromUnit = (unitIndex, lessonIndex) => {
    const currentLessons = unitFields[unitIndex]?.lecciones || [];
    if (currentLessons.length > lessonIndex) {
      const updatedLessons = currentLessons.filter((_, i) => i !== lessonIndex);
      const updatedUnit = {
        ...unitFields[unitIndex],
        lecciones: updatedLessons,
      };
      updateUnit(unitIndex, updatedUnit);
    }
  };

  const addCharacteristic = (unitIndex, lessonIndex) => {
    const lessons = unitFields[unitIndex]?.lecciones || [];
    const lesson = lessons[lessonIndex];
    if (lesson) {
      const updatedLesson = {
        ...lesson,
        recursos: [
          ...lesson.recursos,
          { tipo: "", nombre: "", url: "" },
        ],
      };
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex] = updatedLesson;
      const updatedUnit = { ...unitFields[unitIndex], lecciones: updatedLessons };
      updateUnit(unitIndex, updatedUnit);
    }
  };

  

  const removeCharacteristic = (unitIndex, lessonIndex, characteristicIndex) => {
    const lessons = unitFields[unitIndex]?.lecciones || [];
    const lesson = lessons[lessonIndex];
    if (lesson) {
      const updatedCharacteristics = lesson.recursos.filter(
        (_, i) => i !== characteristicIndex
      );
      const updatedLesson = {
        ...lesson,
        recursos: updatedCharacteristics,
      };
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex] = updatedLesson;
      const updatedUnit = { ...unitFields[unitIndex], lecciones: updatedLessons };
      updateUnit(unitIndex, updatedUnit);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="heading">Creación del Plan de Curso</div>
      <div className="course-header-container" onClick={toggleCourseInfo}>
        <h2 className="course-header">{watch("titulo") || "Nombre del Curso"}</h2>
        <span className="course-header-icon">{isCourseInfoCollapsed ? "↓" : "↑"}</span>
      </div>

      {!isCourseInfoCollapsed && (
        <div className="form-row">
          <div className="form-group">
              <label htmlFor="titulo">Nombre del Curso/Asignatura</label>
              <input
                id="titulo"
                type="text"
                {...register('titulo',)}
              />
              {errors.titulo && <span className="error">{errors.titulo.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <input
                id="categoria"
                type="text"
                {...register('categoria',)}
              />
              {errors.categoria && <span className="error">{errors.categoria.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="autor">Autor</label>
              <input
                id="autor"
                type="text"
                {...register('autor',)}
              />
              {errors.autor && <span className="error">{errors.autor.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="duracion">Duración</label>
              <input
                id="duracion"
                type="text"
                {...register('duracion',)}
              />
              {errors.duracion && <span className="error">{errors.duracion.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fechaCreacion">Fecha Creación</label>
              <input
                id="fechaCreacion"
                type="date"
                {...register('fechaCreacion',)}
              />
              {errors.fechaCreacion && <span className="error">{errors.fechaCreacion.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="programa">Programas</label>
              <input
                id="programa"
                type="text"
                {...register('programa',)}
              />
              {errors.programa && <span className="error">{errors.programa.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="descripcion_larga">Presentación Larga del Curso</label>
              <textarea
                id="descripcion_larga"
                type="text"
                {...register('descripcion_larga',)}
                rows={4} 
                cols={50} 
              />
              {errors.descripcion_larga && <span className="error">{errors.descripcion_larga.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="descripcion_corta">Presentación Corta del Curso</label>
              <textarea
                id="descripcion_corta"
                type="text"
                {...register('descripcion_corta',)}
                rows={4} 
                cols={50} 
              />
              {errors.descripcion_corta && <span className="error">{errors.descripcion_corta.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="resultados_aprendizaje">Resultados de aprendizaje</label>
              <textarea
                id="resultados_aprendizaje"
                type="text"
                {...register('resultados_aprendizaje',)}
                rows={4} 
                cols={50} 
              />
              {errors.resultados_aprendizaje && <span className="error">{errors.resultados_aprendizaje.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="descripcion_link">Descripción/Link Imagen</label>
              <textarea
                id="descripcion_link"
                type="url"
                {...register('descripcion_link',)}
                rows={4} 
                cols={50} 
              />
              {errors.descripcion_link && <span className="error">{errors.descripcion_link.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="storytelling_problema">Storytelling- Problema General</label>
              <textarea
                id="storytelling_problema"
                type="text"
                {...register('storytelling_problema',)}
                rows={4} 
                cols={50} 
              />
              {errors.storytelling_problema && <span className="error">{errors.storytelling_problema.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="storytelling_solucion">Storytelling- Solución General</label>
              <textarea
                id="storytelling_solucion"
                type="text"
                {...register('storytelling_solucion',)}
                rows={4} 
                cols={50} 
              />
              {errors.storytelling_solucion && <span className="error">{errors.storytelling_solucion.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="storytelling_final">Storytelling - Final Feliz</label>
              <textarea
                id="storytelling_final"
                type="text"
                {...register('storytelling_final',)}
                rows={4} 
                cols={50} 
              />
              {errors.storytelling_final && <span className="error">{errors.storytelling_final.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="palabras_clave">Palabras Clave</label>
              <input
                id="palabras_clave"
                type="text"
                {...register('palabras_clave',)}
              />
              {errors.palabras_clave && <span className="error">{errors.palabras_clave.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="publico_objetivo">Público Objetivo</label>
              <input
                id="publico_objetivo"
                type="text"
                {...register('publico_objetivo',)}
              />
              {errors.publico_objetivo && <span className="error">{errors.publico_objetivo.message}</span>}
            </div>
        </div>
      )}

      {/* Sección de Unidades */}
      <h2>Unidades</h2>
      {unitFields.map((unit, unitIndex) => (
        <div key={unit.id} className="form-unit">
          <div className="unit-header" onClick={() => toggleUnit(unitIndex)}>
            <h3>Unidad {unitIndex + 1}</h3>
            <span>{collapsedUnits[unitIndex] ? "↓" : "↑"}</span>
          </div>

          {!collapsedUnits[unitIndex] && (
            <>
              <div className="form-group">
            <div className="">
              <label>Título de la Unidad:</label>
              <input
                id={`tituloUnidad-${unitIndex}`}
                {...register(`unidades[${unitIndex}].titulo`)}
              />
            </div>
            <div>
              <label>Descripción de la Unidad:</label>
              <textarea
                id={`descripcion-${unitIndex}`}
                {...register(`unidades[${unitIndex}].descripcion`)}
                rows={4} 
                cols={50} 
              />
            </div>
          </div>
              <h3>Lecciones</h3>
              {unitFields[unitIndex]?.lecciones?.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="form-lesson">
                  <div className="lesson-header" onClick={() => toggleLesson(unitIndex, lessonIndex)}>
                    <h4>Lección {lessonIndex + 1}</h4>
                    <span>{collapsedLessons[`${unitIndex}-${lessonIndex}`] ? "↓" : "↑"}</span>
                  </div>

                  {!collapsedLessons[`${unitIndex}-${lessonIndex}`] && (
                    <>
                     <div className="form-group">
                <label>Resultado de Aprendizaje:</label>
                <input
                  id={`resultados_aprendizaje-${unitIndex}-${lessonIndex}`}
                  {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].resultados_aprendizaje`)}
                />
              </div>

              <div className="form-group">
                <label>Tipo de Lección:</label>
                <input
                  id={`tipo-${unitIndex}-${lessonIndex}`}
                  {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].tipo`)}
                />
              </div>

              <div className="form-group">
                <label>Propósito del Storytelling:</label>
                <textarea
                  id={`proposito-${unitIndex}-${lessonIndex}`}
                  {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].proposito`)}
                  rows={4} 
                  cols={50} 
                />
              </div>

              <div className="form-group">
                <label>Duración:</label>
                <input
                  id={`duracionLeccion-${unitIndex}-${lessonIndex}`}
                  {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].duracion`)}
                />
              </div>

              <div className="form-group">
                <label>Semana Sugerida:</label>
                <input
                  id={`semana_sugerida-${unitIndex}-${lessonIndex}`}
                  {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].semana_sugerida`)}
                />
              </div>
                      {/* Características */}
                      <h4 className="h">Características de la Lección</h4>
                      {
                      lesson.recursos?.map((char, charIndex) => (
                        <div key={charIndex} className="form-group">
                          <label>Tipo de Recurso:</label>
                          <select className="listaRecursos"
                        {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].recursos[${charIndex}].tipo`)}
                        onChange={(e) => {
                          const otherInput = document.getElementById(`otroTipo-${unitIndex}-${lessonIndex}-${charIndex}`);
                          if (e.target.value === "Otros") {
                            otherInput.style.display = 'block';
                          } else {
                            otherInput.style.display = 'none';
                            setValue(`unidades[${unitIndex}].lecciones[${lessonIndex}].recursos[${charIndex}].tipo`, e.target.value); 
                          }
                        }}>
                        <option value="OVA">OVA</option>
                        <option value="Videos">Videos</option>
                        <option value="Infografía">Infografía</option>
                        <option value="Quices">Quices</option>
                        <option value="Foro">Foro</option>
                        <option value="Entregable">Entregable</option>
                        <option value="Otros">Otros</option>
                      </select>

                <div id={`otroTipo-${unitIndex}-${lessonIndex}-${charIndex}`} style={{ display: 'none' }}>
                  <label>Especificar Tipo de Recurso</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setValue(`unidades[${unitIndex}].lecciones[${lessonIndex}].recursos[${charIndex}].tipo`, e.target.value)
                    } 
                  />
                </div>
                  <label>Nombre de la Característica</label>
                  <input
                    {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].recursos[${charIndex}].nombre`)}
                  />
                  <label>URL</label>
                  <input
                    {...register(`unidades[${unitIndex}].lecciones[${lessonIndex}].recursos[${charIndex}].url`)}
                  />
                          <button
                            type="button"
                            onClick={() => removeCharacteristic(unitIndex, lessonIndex, charIndex)}
                          >
                            Eliminar Característica
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addCharacteristic(unitIndex, lessonIndex)}
                      >
                        Añadir Característica
                      </button>
                    </>
                  )}
                  <button
                className="btn-cancel"
                type="button"
                onClick={() => removeLessonFromUnit(unitIndex, lessonIndex)}
              >
                Eliminar Lección
              </button>
                </div>
              ))}
              <button type="button" onClick={() => addLessonToUnit(unitIndex)}>
                Añadir Lección
              </button>
            </>
          )}
          <button type="button" onClick={() => removeUnit(unitIndex)}>
            Eliminar Unidad
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addUnit({ titulo: "", lecciones: [] })}>
        Añadir Unidad
      </button>
      <button type="submit">Guardar Curso</button>
    </form>
  );
};
