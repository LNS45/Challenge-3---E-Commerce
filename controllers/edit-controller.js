import { clientServices } from "../service/client-services.js";
import { validarFormulario } from "./form-controller.js";
import { capturarCampo } from "./buscar-controller.js";

capturarCampo();
validarFormulario();
const url = new URL(window.location);
const id = url.searchParams.get("id");

//Logica para obtener informacion del producto y editar
const obtenerInfo = () => {

    clientServices.detalleProducto(id)
    .then((datos)=> {
        capturarCamposTabla(datos.imagen,datos.categoria,datos.nombre,datos.precio,datos.descripcion);
    });

}

function capturarCamposTabla(urlImagen,categoria,nombre,precio,descripcion) {
    const parametros = [
        urlImagen,
        categoria,
        nombre,
        precio,
        descripcion
    ];
    const $input = document.querySelectorAll("[data-input]");
    $input.forEach(element => {
        if(element.dataset.input.includes("Producto")){
            for(let i = 0; i < inputsProducto.length; i++){
                if(element.dataset.input == inputsProducto[i]){
                    element.value = parametros[i];
                }
            }
        }
    });
}
const inputsProducto = [
    "imagenProducto",
    "categoriaProducto",
    "nombreProducto",
    "precioProducto",
    "descripcionProducto"
]

const editar = () => {
    const form = document.querySelector(".form");
    form.addEventListener('submit',(e) => {
        e.preventDefault();

        const $input = document.querySelectorAll("[data-input]");
        let valores = [];
        $input.forEach(element => {
            if(element.dataset.input.includes("Producto")){
                valores.push(element.value)
            }
        }); 
    clientServices.editarProducto(id,valores[2],valores[3],valores[4],valores[1],valores[0]);
    })
}
editar();
obtenerInfo();
capturarCamposTabla();