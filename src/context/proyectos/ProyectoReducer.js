import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    ERROR_PROYECTO,
    VALIDAR_FORM,
    PROYECTO_ACTUAL, 
    ELIMINAR_PROYECTO
}  from '../../types';

const reducer = (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,           //Copia de todo el state.
                formulario: true    //Cambiamos de estado al formulario.
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload       //El payload contiene todo el arreglo que se mando como parametro en el state.
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [ action.payload, ...state.proyectos ],
                formulario: false,
                errorformulario: false
            }   
        case VALIDAR_FORM: 
            return {
                ...state,
                errorformulario: true
            }     
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }     
        case ELIMINAR_PROYECTO:
            return { 
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }        
        
        case ERROR_PROYECTO:
            return { 
                ...state,
                mensaje: action.payload
            }    

        default: 
            return state;
    }
}

export default reducer;