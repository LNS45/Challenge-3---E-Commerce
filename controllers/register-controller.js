import { validarFormulario } from "./form-controller.js";
import { clientServices } from "../service/client-services.js";

validarFormulario();

function activarBoton(){
    const btn = document.querySelector(".tabla__boton");
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const campos = capturarCampos();
        clientServices.agregarProducto(campos[1], campos[2],campos[3],campos[4],campos[0]);
    });
};



const capturarCampos = () =>{
    let valoresDeCampos = [];
    const $campos = document.querySelectorAll("[data-input]");
    $campos.forEach(campo => {
        if(campo.dataset.input.includes("Producto")){
            valoresDeCampos.push(campo.value);
        };
    });
    return valoresDeCampos;
};

activarBoton();

