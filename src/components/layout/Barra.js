import React, { useContext } from 'react';
import AuthContext from '../../context/autenticaciones/AuthContext';

const Barra = () => {

    //Extrayendo los datos del context 
    const authContext = useContext(AuthContext);
    const { usuario, cerrarSesion } = authContext;

    return (
        <header className="app-header">
            {
                usuario 
                ? 
                    <p className="nombre-usuario">Hola <span>{usuario.nombre}</span>! </p>
                : 
                    null
            }
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
};

export default Barra;