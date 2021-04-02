import React, { useContext, useEffect } from 'react';

//Componentes
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

//Context
import AuthContext from '../../context/autenticaciones/AuthContext';

const Proyectos = () => {

    //Extraer la informacion de autenticación
    const authContext = useContext(AuthContext); 
    const { obtenerUsuarioAutenticado } = authContext;

    useEffect(() => {
        obtenerUsuarioAutenticado();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Proyectos;