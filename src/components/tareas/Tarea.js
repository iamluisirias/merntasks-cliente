import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({tarea}) => {

    //Extraer si un proyecto esta activo.
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    //Estraer el proyecto actual.
    const [ proyectoActual ] = proyecto

    //Obtener la funcion del context de tarea.
    const tareasContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, editarTarea, actualizarTarea } = tareasContext;

    //Funcion que se ejecuta cuando el usuario presiona el boton eliminar de una tarea.
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion para modificar el estado actual de la tarea seleccionada.
    const cambiarEstado = tarea => {
         if (tarea.estado) {
            tarea.estado = false;
         } else {
            tarea.estado = true;
         }

        editarTarea(tarea);
    }

    //Funcion para traer una tarea existente para modificarla.
    const seleccionarTarea = tarea => {
        actualizarTarea(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={ () => cambiarEstado(tarea) }
                        >Completa</button>
                    ):
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={ () => cambiarEstado(tarea) }
                        >Incompleta</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export default Tarea;