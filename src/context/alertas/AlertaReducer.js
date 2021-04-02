import { MOSTRAR_TAREA, OCULTAR_TAREA } from '../../types';

const reducer = (state, action) => {
    switch(action.type) {
        case MOSTRAR_TAREA:
            return {
                alerta: action.payload          }
        
        case OCULTAR_TAREA:
            return {
                alerta: null
            }        
    
        default:
           return state;
    }
}

export default reducer;