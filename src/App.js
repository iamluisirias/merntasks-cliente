import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import RutaPrivada from './components/rutas/RutaPrivada';

import tokenAuth from './config/token';

//Context
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/autenticaciones/AuthState';


function App() {

  //Revisaremos si tenemos un token, vamos a ratar de loguear al usuario.
  const token = localStorage.getItem('token');

  if (token) {
    tokenAuth(token);
  }

  //console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
                
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
