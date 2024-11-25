import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../style/formCreate.css";

const FormCreate = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCurso: "",
      categoria: "",
      autor: "",
      duracion: "",
      fechaCreacion: "",
      programas: "",
      presentacionLarga: "",
      presentacionCorta: "",
      resultadosAprendizaje: "",
      descripcionImagen: "",
      storytellingProblema: "",
      storytellingSolucion: "",
      storytellingFinal: "",
      palabrasClave: "",
      publicoObjetivo: "",
      units: [],
    },
  });

  const {
    fields: unitFields,
    append: addUnit,
    remove: removeUnit,
    update: updateUnit,
  } = useFieldArray({
    control,
    name: "units",
  });

  const addLessonToUnit = (unitIndex) => {
    const currentLessons = unitFields[unitIndex]?.lessons || [];
    const newLesson = {
      tituloleccion: "",
      tematica: "",
      resultadoAprendizajeLeccion: "",
      tipoLeccion: "",
      caracteristicaLeccion: [],
      propositoStorytelling: "",
      duracion: "",
      semanaSugerida: "",
    };

    const updatedUnit = {
      ...unitFields[unitIndex],
      lessons: [...currentLessons, newLesson],
    };
    updateUnit(unitIndex, updatedUnit);
  };

  const removeLessonFromUnit = (unitIndex, lessonIndex) => {
    const currentLessons = unitFields[unitIndex]?.lessons || [];
    if (currentLessons.length > lessonIndex) {
      const updatedLessons = currentLessons.filter((_, i) => i !== lessonIndex);
      const updatedUnit = {
        ...unitFields[unitIndex],
        lessons: updatedLessons,
      };
      updateUnit(unitIndex, updatedUnit);
    }
  };

  const addCharacteristic = (unitIndex, lessonIndex) => {
    const lessons = unitFields[unitIndex]?.lessons || [];
    const lesson = lessons[lessonIndex];
    if (lesson) {
      const updatedLesson = {
        ...lesson,
        caracteristicaLeccion: [
          ...lesson.caracteristicaLeccion,
          { tipo: "", nombre: "", url: "" },
        ],
      };
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex] = updatedLesson;
      const updatedUnit = { ...unitFields[unitIndex], lessons: updatedLessons };
      updateUnit(unitIndex, updatedUnit);
    }
  };

  const removeCharacteristic = (unitIndex, lessonIndex, characteristicIndex) => {
    const lessons = unitFields[unitIndex]?.lessons || [];
    const lesson = lessons[lessonIndex];
    if (lesson) {
      const updatedCharacteristics = lesson.caracteristicaLeccion.filter(
        (_, i) => i !== characteristicIndex
      );
      const updatedLesson = {
        ...lesson,
        caracteristicaLeccion: updatedCharacteristics,
      };
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex] = updatedLesson;
      const updatedUnit = { ...unitFields[unitIndex], lessons: updatedLessons };
      updateUnit(unitIndex, updatedUnit);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="heading">Creación del Plan de Curso</div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombreCurso">Nombre del Curso/Asignatura</label>
          <input
            id="nombreCurso"
            type="text"
            {...register('nombreCurso',)}
          />
          {errors.nombreCurso && <span className="error">{errors.nombreCurso.message}</span>}
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
          <label htmlFor="programas">Programas</label>
          <input
            id="programas"
            type="text"
            {...register('programas',)}
          />
          {errors.programas && <span className="error">{errors.programas.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="presentacionLarga">Presentación Larga del Curso</label>
          <input
            id="presentacionLarga"
            type="text"
            {...register('presentacionLarga',)}
          />
          {errors.presentacionLarga && <span className="error">{errors.presentacionLarga.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="presentacionCorta">Presentación Corta del Curso</label>
          <input
            id="presentacionCorta"
            type="text"
            {...register('presentacionCorta',)}
          />
          {errors.presentacionCorta && <span className="error">{errors.presentacionCorta.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="resultadosAprendizaje">Resultados de aprendizaje</label>
          <input
            id="resultadosAprendizaje"
            type="text"
            {...register('resultadosAprendizaje',)}
          />
          {errors.resultadosAprendizaje && <span className="error">{errors.resultadosAprendizaje.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcionImagen">Descripción/Link Imagen</label>
          <input
            id="descripcionImagen"
            type="url"
            {...register('descripcionImagen',)}
          />
          {errors.descripcionImagen && <span className="error">{errors.descripcionImagen.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="storytellingProblema">Storytelling- Problema General</label>
          <input
            id="storytellingProblema"
            type="text"
            {...register('storytellingProblema',)}
          />
          {errors.storytellingProblema && <span className="error">{errors.storytellingProblema.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="storytellingSolucion">Storytelling- Solución General</label>
          <input
            id="storytellingSolucion"
            type="text"
            {...register('storytellingSolucion',)}
          />
          {errors.storytellingSolucion && <span className="error">{errors.storytellingSolucion.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="storytellingFinal">Storytelling - Final Feliz</label>
          <input
            id="storytellingFinal"
            type="text"
            {...register('storytellingFinal',)}
          />
          {errors.storytellingFinal && <span className="error">{errors.storytellingFinal.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="palabrasClave">Palabras Clave</label>
          <input
            id="palabrasClave"
            type="text"
            {...register('palabrasClave',)}
          />
          {errors.palabrasClave && <span className="error">{errors.palabrasClave.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="publicoObjetivo">Público Objetivo</label>
          <input
            id="publicoObjetivo"
            type="text"
            {...register('publicoObjetivo',)}
          />
          {errors.publicoObjetivo && <span className="error">{errors.publicoObjetivo.message}</span>}
        </div>
      </div>

      <h2 className="h">Unidades</h2>
      {unitFields.map((unit, unitIndex) => (
        <div key={unit.id} className='form-unit'>
          <h3 className="h" >Unidad {unitIndex + 1}</h3>
          <div className="form-group">
            <div>
              <label>Título de la Unidad:</label>
              <input
                id={`tituloUnidad-${unitIndex}`}
                {...register(`units[${unitIndex}].title`, { required: "Título de la unidad es obligatorio" })}
              />
            </div>
            <div>
              <label>Descripción de la Unidad:</label>
              <input
                id={`descripcionUnidad-${unitIndex}`}
                {...register(`units[${unitIndex}].description`)}
              />
            </div>
          </div>

          <h3 className="h">Lecciones</h3>
          {unit.lessons?.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className='form-lesson'>
              <h3 className="h" >Leccion {lessonIndex + 1}</h3>
              <div className="form-group">
                <label>Título de la Lección:</label>
                <input
                  id={`tituloLeccion-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].tituloleccion`, { required: "Título de la lección es obligatorio" })}
                />
              </div>

              <div className="form-group">
                <label>Tema:</label>
                <input
                  id={`tematicaLeccion-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].tematica`, { required: "Tema de la lección es obligatorio" })}
                />
              </div>

              <div className="form-group">
                <label>Resultado de Aprendizaje:</label>
                <input
                  id={`resultadoAprendizajeLeccion-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].resultadoAprendizajeLeccion`, { required: "Resultado de aprendizaje es obligatorio" })}
                />
              </div>

              <div className="form-group">
                <label>Tipo de Lección:</label>
                <input
                  id={`tipoLeccion-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].tipoLeccion`, { required: "Tipo de lección es obligatorio" })}
                />
              </div>

              <div className="form-group">
                <label>Propósito del Storytelling:</label>
                <input
                  id={`propositoStorytelling-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].propositoStorytelling`, { required: "Propósito del storytelling es obligatorio" })}
                />
              </div>

              <div className="form-group">
                <label>Duración:</label>
                <input
                  id={`duracionLeccion-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].duracion`, { required: "Duración de la lección es obligatoria" })}
                />
              </div>

              <div className="form-group">
                <label>Semana Sugerida:</label>
                <input
                  id={`semanaSugerida-${unitIndex}-${lessonIndex}`}
                  {...register(`units[${unitIndex}].lessons[${lessonIndex}].semanaSugerida`, { required: "Semana sugerida es obligatoria" })}
                />
              </div>

              <h4 className="h">Características de la Lección</h4>
              {lesson.caracteristicaLeccion?.map((char, charIndex) => (
                <div className="form-group" key={charIndex}>
                  <label>Tipo de Recurso</label>
                  <select
                    className="listaRecursos"
                    {...register(`units[${unitIndex}].lessons[${lessonIndex}].caracteristicaLeccion[${charIndex}].tipo`)}
                    onChange={(e) => {
                      if (e.target.value === "Otros") {
                        document.getElementById(`otroTipo-${unitIndex}-${lessonIndex}-${charIndex}`).style.display = 'block';
                      } else {
                        document.getElementById(`otroTipo-${unitIndex}-${lessonIndex}-${charIndex}`).style.display = 'none';
                      }
                    }}
                  >
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
                      {...register(`units[${unitIndex}].lessons[${lessonIndex}].caracteristicaLeccion[${charIndex}].otroTipo`)}
                    />
                  </div>

                  <label>Nombre de la Característica</label>
                  <input
                    {...register(`units[${unitIndex}].lessons[${lessonIndex}].caracteristicaLeccion[${charIndex}].nombre`)}
                  />
                  <label>URL</label>
                  <input
                    {...register(`units[${unitIndex}].lessons[${lessonIndex}].caracteristicaLeccion[${charIndex}].url`)}
                  />

                  <button
                    className="btn-cancel"
                    type="button"
                    onClick={() =>
                      removeCharacteristic(unitIndex, lessonIndex, charIndex)
                    }
                  >
                    Eliminar Característica
                  </button>
                </div>
              ))}
              <button
                className="btn-resource"
                type="button"
                onClick={() => addCharacteristic(unitIndex, lessonIndex)}
              >
                Añadir Característica
              </button>

              <button
                className="btn-cancel"
                type="button"
                onClick={() => removeLessonFromUnit(unitIndex, lessonIndex)}
              >
                Eliminar Lección
              </button>
            </div>
          ))}
          <button className="btn-lesson" type="button" onClick={() => addLessonToUnit(unitIndex)}>
            Añadir Lección
          </button>

          <button className="btn-cancel" type="button" onClick={() => removeUnit(unitIndex)}>
            Eliminar Unidad
          </button>
        </div>
      ))}

      <button className="btn-unit" type="button" onClick={() => addUnit({ title: "" })}>
        Añadir Unidad
      </button>

      <button className="btn-sumit" type="submit">Crear Curso</button>
    </form>
  );
};

export default FormCreate;