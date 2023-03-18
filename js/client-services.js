import { validarFormulario } from "./form-controller.js";
import { mostrarTodosLosProductos } from "./productList-controller.js";
//Llamado a funciones de los scripts

export const controlador = (pagina) => {
    validarFormulario();
    mostrarTodosLosProductos(pagina);    
}
