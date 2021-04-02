import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticaciones/AuthContext';

const RutaPrivada = ({component: Component, ...props}) => {

    //Creando el context
    const authContext = useContext(AuthContext);
    const { autenticado, cargando, obtenerUsuarioAutenticado } = authContext;

      //Obteniendo el usuario
    useEffect(() => {
        obtenerUsuarioAutenticado();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route
            { ...props }
            render={props => !autenticado && !cargando ? 
                (
                    <Redirect to="/"/>
                ): 
                (
                    <Component {...props}/>
                )}
        />
    );
};

export default RutaPrivada;