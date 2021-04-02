import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AlertaContext from '../../context/alertas/AlertaContext'
import AuthContext from '../../context/autenticaciones/AuthContext';

const NuevaCuenta = () => {

    //Extrayendo los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //Extrayendo el historial para poder despues redirigir en el react-router-dom
    const history = useHistory();

    //En caso de que el usuario se registre, autentique o que exista un registro duplicado
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
        nombre:'',
        email: '',
        password: '',
        password2: ''
    }) 

    const { nombre, email, password, password2 } = usuario;

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
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Validar que la password sea minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('La contraseña debe de ser minimo de 6 caracteres', 'alerta-error');
            return;
        }

        //ademas de que sea igual a password2
        if (password !== password2) {
            mostrarAlerta('Las contraseñas deben de coincidir', 'alerta-error');
            return;
        }

        //Pasarlo al action.
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

  return (
    <div className="form-usuario">
        {
            alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null
        }
      <div className="contenedor-form sombra-dark">
        <h1>Obtiene una cuenta</h1>

        <form
            onSubmit={onSubmit}
        >
             <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input 
                    type="text" 
                    name="nombre" 
                    id="nombre" 
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={onChange}
                />
            </div>
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
                <label htmlFor="password2">Confirmar Contraseña</label>
                <input 
                    type="password" 
                    name="password2" 
                    id="password2" 
                    placeholder="Confirma tu contraseña"
                    value={password2}
                    onChange={onChange}
                />
            </div>
            <div className="campo-form">
                <input 
                    type="submit" 
                    className="btn btn-primario btn-block"
                    value="Crear Cuenta"
                />
            </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
            Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;