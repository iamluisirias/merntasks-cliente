import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Tarea from "./Tarea";

import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const ListadoTareas = () => {

    const proyectosContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;
    
    const tareasContext = useContext(TareaContext);
    const { tareasproyecto } = tareasContext;

    //const nodeRef = useRef(null); //Eliminar el maldito warning.

    //Si no se tiene ningun proyecto seleccionado
    if (!proyecto) return ( <h2>Selecciona un proyecto</h2> )

    //Array destructuring para asignar el proyecto actual seleccionado.
    const [ proyectoActual ] = proyecto;

    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
            {
                tareasproyecto.length === 0 ? 
                <TransitionGroup>
                    <CSSTransition
                        timeout={400}
                        classNames="tarea"
                    >
                        <li className="tarea" /*ref={nodeRef}*/>
                            <p>No hay tareas</p>
                        </li>

                    </CSSTransition>
                </TransitionGroup>       
                : 
                <TransitionGroup>
                    {
                        tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}                //Se mueve aqui el key porque es el primer hijo de la iteracion del map.
                                timeout={400}
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={tarea} 
                                />
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
                    
                
            }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >
                Eliminar Proyecto &times;
            </button>
        </>
    );
};

export default ListadoTareas;
