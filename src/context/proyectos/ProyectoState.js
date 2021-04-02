import React, { useReducer } from 'react';

import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORM,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO, 
    ERROR_PROYECTO
}  from '../../types';

import clienteAxios from '../../config/axios';


const ProyectoState = props => {

    const initialState = { 
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto : null,
        mensaje : null
        
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            //console.log(resultado);
           
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
    }

    //Agregar un nuevo proyecto
    const agregarProyecto = async proyecto => {
        //proyecto.id = uuidv4();           //Ya no es necesario ya que mongo le agrega uno al registro.

        try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto);

            //Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
           
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
    }

    //Validar el formulario por errores.
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORM
        })
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
    }


    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario : state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;
