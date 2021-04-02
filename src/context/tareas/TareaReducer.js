import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITA_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const reducer = (state, action) => {
    switch (action.type) {

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            }

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [ ...state.tareasproyecto, action.payload ],   //Arreglo nuevo de tareas + la tarea nueva.
                errortarea: false
            }    
        
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
                
            }    

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload )
            }    
        
        case EDITA_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)  //Returna la tarea como esta si no es la que cambiamos el estado si, es la que busacamos que retorne la tarea con el atributo estado cambiado.
            }    

        case TAREA_ACTUAL: 
            return {
                ...state,
                tareaseleccionada: action.payload
            }  

        case LIMPIAR_TAREA: 
            return{
                ...state,
                tareaseleccionada: null
            }    

        default: 
            return state;
        
    }
}

export default reducer;