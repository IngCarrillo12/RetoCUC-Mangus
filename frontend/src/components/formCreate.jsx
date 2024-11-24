import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import "../style/formCreate.css";

const FormCreate = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCurso: '',
      categoria: '',
      autor: '',
      duracion: '',
      fechaCreacion: '',
      programas: '',
      presentacionLarga: '',
      presentacionCorta: '',
      resultadosAprendizaje: '',
      descripcionImagen: '',
      storytellingProblema: '',
      storytellingSolucion: '',
      storytellingFinal: '',
      palabrasClave: '',
      publicoObjetivo: '',
      units: []
    }
  });

  const { fields: unitFields, append: addUnit, remove: removeUnit } = useFieldArray({
    control,
    name: "units",
  });

  const [lessonFields, setLessonFields] = useState({}); // { unitIndex: [{ id, title, resource }] }

  const addLesson = (unitIndex) => {
    setLessonFields((prev) => ({
      ...prev,
      [unitIndex]: [...(prev[unitIndex] || []), { title: "", resource: "" }],
    }));
  };

  const removeLesson = (unitIndex, lessonIndex) => {
    setLessonFields((prev) => {
      const updated = { ...prev };
      updated[unitIndex].splice(lessonIndex, 1);
      return updated;
    });
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="heading">Plan de Curso (Metodologías Ágiles)</div>

      {/* Campos del Curso */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombreCurso">Nombre del Curso/Asignatura</label>
          <input
            id="nombreCurso"
            type="text"
            {...register('nombreCurso', { required: 'Este campo es obligatorio' })}
          />
          {errors.nombreCurso && <span className="error">{errors.nombreCurso.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <input
            id="categoria"
            type="text"
            {...register('categoria', { required: 'Este campo es obligatorio' })}
          />
          {errors.categoria && <span className="error">{errors.categoria.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor</label>
          <input
            id="autor"
            type="text"
            {...register('autor', { required: 'Este campo es obligatorio' })}
          />
          {errors.autor && <span className="error">{errors.autor.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="duracion">Duración</label>
          <input
            id="duracion"
            type="text"
            {...register('duracion', { required: 'Este campo es obligatorio' })}
          />
          {errors.duracion && <span className="error">{errors.duracion.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="fechaCreacion">Fecha Creación</label>
          <input
            id="fechaCreacion"
            type="date"
            {...register('fechaCreacion', { required: 'Este campo es obligatorio' })}
          />
          {errors.fechaCreacion && <span className="error">{errors.fechaCreacion.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="programas">Programas</label>
          <input
            id="programas"
            type="text"
            {...register('programas', { required: 'Este campo es obligatorio' })}
          />
          {errors.programas && <span className="error">{errors.programas.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="presentacionLarga">Presentación Larga del Curso</label>
          <input
            id="presentacionLarga"
            type="text"
            {...register('presentacionLarga', { required: 'Este campo es obligatorio' })}
          />
          {errors.presentacionLarga && <span className="error">{errors.presentacionLarga.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="presentacionCorta">Presentación Corta del Curso</label>
          <input
            id="presentacionCorta"
            type="text"
            {...register('presentacionCorta', { required: 'Este campo es obligatorio' })}
          />
          {errors.presentacionCorta && <span className="error">{errors.presentacionCorta.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="resultadosAprendizaje">Resultados de aprendizaje</label>
          <input
            id="resultadosAprendizaje"
            type="text"
            {...register('resultadosAprendizaje', { required: 'Este campo es obligatorio' })}
          />
          {errors.resultadosAprendizaje && <span className="error">{errors.resultadosAprendizaje.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcionImagen">Descripción/Link Imagen</label>
          <input
            id="descripcionImagen"
            type="url"
            {...register('descripcionImagen', { required: 'Este campo es obligatorio' })}
          />
          {errors.descripcionImagen && <span className="error">{errors.descripcionImagen.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="storytellingProblema">Storytelling- Problema General</label>
          <input
            id="storytellingProblema"
            type="text"
            {...register('storytellingProblema', { required: 'Este campo es obligatorio' })}
          />
          {errors.storytellingProblema && <span className="error">{errors.storytellingProblema.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="storytellingSolucion">Storytelling- Solución General</label>
          <input
            id="storytellingSolucion"
            type="text"
            {...register('storytellingSolucion', { required: 'Este campo es obligatorio' })}
          />
          {errors.storytellingSolucion && <span className="error">{errors.storytellingSolucion.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="storytellingFinal">Storytelling - Final Feliz</label>
          <input
            id="storytellingFinal"
            type="text"
            {...register('storytellingFinal', { required: 'Este campo es obligatorio' })}
          />
          {errors.storytellingFinal && <span className="error">{errors.storytellingFinal.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="palabrasClave">Palabras Clave</label>
          <input
            id="palabrasClave"
            type="text"
            {...register('palabrasClave', { required: 'Este campo es obligatorio' })}
          />
          {errors.palabrasClave && <span className="error">{errors.palabrasClave.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="publicoObjetivo">Público Objetivo</label>
          <input
            id="publicoObjetivo"
            type="text"
            {...register('publicoObjetivo', { required: 'Este campo es obligatorio' })}
          />
          {errors.publicoObjetivo && <span className="error">{errors.publicoObjetivo.message}</span>}
        </div>
      </div>

      {/* Unidades y Lecciones */}
      <h2 className="h">Unidades</h2>
      {unitFields.map((unit, unitIndex) => (
        <div key={unit.id} className='form-unit'>
          <h3 className="h" >Unidad {unitIndex + 1}</h3>
          <div className="form-group">
            <div>
              <label>Título de la Unidad:</label>
              <input
                {...register(`units[${unitIndex}].title`, {   required: "Título de la unidad es   obligatorio" })}
              />
            </div>
            <div>
              <label>Descripción de la Unidad:</label>
              <textarea {...register(`units[${unitIndex}].  description`)} />
            </div>
          </div>         

          <h4 className="h">Lecciones</h4>
          {(lessonFields[unitIndex] || []).map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="form-group">
              <div>
                <label>Título de la Lección:</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => {
                    const updatedLessons = [...lessonFields[unitIndex]];
                    updatedLessons[lessonIndex].title = e.target.value;
                    setLessonFields((prev) => ({
                      ...prev,
                      [unitIndex]: updatedLessons,
                    }));
                  }}
                />
              </div>
              <div>
                <label>Recurso:</label>
                <input
                  type="text"
                  value={lesson.resource}
                  onChange={(e) => {
                    const updatedLessons = [...lessonFields[unitIndex]];
                    updatedLessons[lessonIndex].resource = e.target.value;
                    setLessonFields((prev) => ({
                      ...prev,
                      [unitIndex]: updatedLessons,
                    }));
                  }}
                />
              </div>
              <div className="button-container">
                <button type="button"  className="btn-lesson" onClick={() => removeLesson(unitIndex, lessonIndex)}> Eliminar lección </button>
              </div>
            </div>
          ))}

          <div className="button-container">
            <button type="button"  className="btn-lesson" onClick={() => addLesson(unitIndex)}>Añadir Lección</button>
          </div>

          <div className="button-container">
              <button type="button"  className="btn-unit" onClick={() => removeUnit(unitIndex)}>Eliminar Unidad</button>
          </div>          
        </div>
      ))}

      <div className="button-container">
      <button type="button"  className="btn-unit" onClick={() => addUnit({})}>Añadir Unidad</button>
      </div>      

      {/* Botón de Enviar */}
      <div className="button-container">
        <button type="submit"  className="btn-submit">Guardar Curso</button>
      </div>
      
    </form>
  );
};

export default FormCreate;