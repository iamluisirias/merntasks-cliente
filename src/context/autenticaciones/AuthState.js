import React, { useReducer } from 'react'
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";

const AuthState = props => {

    //Estado inicial del state
    const initialState = {
        token: localStorage.getItem('token'),       //Una vez obtenido un token, este se guardará en el localStorage para su posterior uso.
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    //Array destructuring para extraer el dispatch y el state del reducer.
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    //Funciones
    const registrarUsuario = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            //console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //Obtenemos el usuario
            obtenerUsuarioAutenticado();

        } catch (error) {
            //console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //Funcion para retornar el usuario que esta actualmente logueado/registrado.
    const obtenerUsuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            tokenAuth(token)        //Asignamos al header el token
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta);
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }


    //Funcion cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta.data); 

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data         //Aqui viene el token del controller.
            })

            //Despues del login exitoso entonces se trae al usuario activo
            obtenerUsuarioAutenticado();

        } catch (error) {
            //console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    } 

    //Cierra la sesion del usuario actual
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                obtenerUsuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
