import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AlertaContext from '../../context/alertas/AlertaContext'
import AuthContext from '../../context/autenticaciones/AuthContext';


const Login = () => {
    //Extrayendo los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //Extrayendo el historial para poder despues redirigir en el react-router-dom
    const history = useHistory();

    //En caso de que el email o password no existan/sean correctos.
    useEffect(() => {
        if (autenticado) {
            history.push('/proyectos')    //Para redirigirlo a la pagina delos proyectos una vez autenticado.
        }
        
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ mensaje, autenticado, history ])

    //State para iniciar sesion
    const [ usuario, actualizarUsuario ] = useState({
        email: '',
        password: ''
    }) 

    const { email, password } = usuario;

    const onChange = e => {
        actualizarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesion.
    const onSubmit = e => {
        e.preventDefault();

        //Validar que no haya campos vacios.
        if ( email.trim() === '' || password.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //Pasarlo al action.
        iniciarSesion({ email, password });
    }

  return (
    <div className="form-usuario">
        {
            alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null
        }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form
            onSubmit={onSubmit}
        >
            <div className="campo-form">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Tu email"
                    value={email}
                    onChange={onChange}
                />
            </div>
            <div className="campo-form">
                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Tu Contraseña"
                    value={password}
                    onChange={onChange}
                />
            </div>
            <div className="campo-form">
                <input 
                    type="submit" 
                    className="btn btn-primario btn-block"
                    value="Iniciar Sesión"
                />
            </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
            Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
