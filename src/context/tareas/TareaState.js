import React, { useReducer } from 'react';

//Context
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer'; 

import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITA_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    //Creando las funciones
    //Obtener las tareas del proyecto
    const obtenerTareas = async proyecto => {
        try {
            
            const resultado = await clienteAxios.get(`/api/tareas`, { params: { proyecto } });

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })

        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado.
    const agregarTarea = async tarea => {
        try {

            await clienteAxios.post('/api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra un mensaje de error si es necesario.
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id.
    const eliminarTarea = async ( id, proyecto ) => {
        try {

            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
           
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        } catch (error) {
            console.log(error);
        }
    }

    //Vamos a editar la tarea que se seleccionó.
    const editarTarea = async tarea => {
        try {
            
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: EDITA_TAREA,
                payload: resultado.data.tareaExistente
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Selecciona una tarea cuando el usuario quiere modificar una ya existente
    const actualizarTarea = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Limpiando el valor de la tareaseleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                actualizarTarea,
                editarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;