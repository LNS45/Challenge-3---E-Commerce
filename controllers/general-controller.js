import { validarFormulario } from "form-controller.js";
import { mostrarTodosLosProductos } from "productList-controller.js";
import { animaciones } from "animation-controller.js";
import { capturarCampo } from "buscar-controller.js";
//Llamado a funciones de los scripts

//Indice debe ser menor a cantidadSecciones.
export const controlador = (pagina, cantidadSecciones, indice, cantidadProductos) => {
    animaciones();
    AOS.init();
    capturarCampo();
    validarFormulario();
    mostrarTodosLosProductos(pagina, cantidadSecciones, indice, cantidadProductos);
}
