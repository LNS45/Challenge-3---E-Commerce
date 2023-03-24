import { validarFormulario } from "./form-controller.js";
import { mostrarTodosLosProductos } from "./productList-controller.js";
//Llamado a funciones de los scripts

//Indice debe ser menor a cantidadSecciones.
export const controlador = (pagina, cantidadSecciones, indice, cantidadProductos) => {
    validarFormulario();
    mostrarTodosLosProductos(pagina, cantidadSecciones, indice, cantidadProductos);
}
