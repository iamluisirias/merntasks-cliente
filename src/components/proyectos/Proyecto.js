import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto}) => {

    //Obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectosContext;
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);     //Fijar un proyecto actual.
        obtenerTareas(id);      //Filtrar las tareas correspondientes a ese proyecto.
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id) }
            >
                {proyecto.nombre}
            </button> 
        </li>
    );
};

export default Proyecto;