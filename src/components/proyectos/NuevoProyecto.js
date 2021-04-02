import React, { useContext, useState } from 'react';

import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //State para proyecto 
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    })

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto.
        if(nombre === ''){
            mostrarError();
            return;
        }

        //Agregar al state.
        agregarProyecto(proyecto);

        //Reiniciar el form.
        guardarProyecto({
            nombre: ''
        })
    }

    //Mostrar el form
    const onClickForm = () => {
        mostrarFormulario();
    }

    return (
        <>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickForm}
            >
                Nuevo Proyecto
            </button>

            {
                formulario 
                ?
                    (
                        <form 
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text" 
                                className="input-text"
                                name="nombre" 
                                placeholder="Nombre del proyecto"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit" 
                                className="btn btn-block btn-primario"
                                value="Agregar Proyecto"
                            />
                        </form> 
                    )
                :
                    null
            }
            {
                errorformulario ? <p className="mensaje error">Se necesita un nombre</p> : null
            }
        </>
        
    );
};

export default NuevoProyecto;