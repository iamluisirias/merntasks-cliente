import React, { useReducer } from 'react';
import AlertaReducer from './AlertaReducer';
import AlertaContext from './AlertaContext';
import { MOSTRAR_TAREA, OCULTAR_TAREA } from '../../types';

const AlertaState = props => {

    //Estado inicial del state
  const initialState = {
      alerta: null
  }

  const [ state, dispatch ] = useReducer(AlertaReducer, initialState);

  //Funciones
  const mostrarAlerta = ( msg, categoria ) => {
      dispatch({
          type: MOSTRAR_TAREA,
          payload: {
              msg,
              categoria

          }
      });

      //Despues de 5 minutos, se limpia o se deja de mostrar el mensaje de alerta en pantalla.
      setTimeout(() => {
          dispatch({
              type: OCULTAR_TAREA
          })
      }, 5000);
  }

    return (
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
           { props.children }
        </AlertaContext.Provider>
    );
};

export default AlertaState;
