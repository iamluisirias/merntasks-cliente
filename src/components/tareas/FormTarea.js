import React, { useContext, useEffect, useState } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    //Extraer si un proyecto esta activo.
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    //Agregar una tarea al proyecto
    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, editarTarea, limpiarTarea } = tareasContext;

     //State del formulario
     const [ tarea, guardarTarea ] = useState({
        nombre: ''
    });

    //Effect que detecta si hay una tarea a editar seleccioanda
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    },[tareaseleccionada])

   
    //Si no hay proyecto seleccionado.
    if (!proyecto) return null;

    //Para mantener una referencia de a que proyecto se le agregaran las tareas.
    const [ proyectoActual ] = proyecto;

    //Leer los valores del formulario.
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    //Destructuring, extrayendo el nombre de la tarea.
    const { nombre } = tarea; 

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === "") {
            validarTarea();
            return;
        }

        //Vamos a ver si es un nuevo registro o si se esta modificando una tarea ya existente.
        if (tareaseleccionada === null) {

            //Agregar la nueva tarea al state.
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);

        }else {

            editarTarea(tarea);

            //Eliminando la tareaselecionada del state una vez ha sido modificada.
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual.
        obtenerTareas(proyectoActual._id);

        //Reiniciar el form.
        guardarTarea({
            nombre: ""
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Escribe una tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}

                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-block btn-primario btn-submit"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>

            {
                errortarea 
                ? 
                    <p className="mensaje error">La tarea no debe de estar vacía</p> 
                : 
                    null
            }
        </div>
    );
};

export default FormTarea;