import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Proyecto from './Proyecto';

//Context
import ProyectoContext from '../../context/proyectos/ProyectoContext'; 
import AlertaContext from '../../context/alertas/AlertaContext';

const ListadoProyectos = () => {

   //Obtener el state del listado de los proyectos
   const proyectosContext = useContext(ProyectoContext);
   const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

   const alertaContext = useContext(AlertaContext);
   const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {

        //Si existe un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

       obtenerProyectos();
       //eslint-disable-next-line
    },[ mensaje ]);

   //Revisar que proyectos tiene contenido.
   if(proyectos.length === 0) return <p>No hay proyectos, crea uno.</p> ;

    return (
        <ul className="listado-proyectos">

            {
                alerta 
                ? 
                    (
                        <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div>
                    ) 
                : 
                    null 
            }

            <TransitionGroup>
                {
                    proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Proyecto
                                proyecto={proyecto}
                            />
                        </CSSTransition>

                        
                    ))
                }
            </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;