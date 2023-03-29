import { validarFormulario } from "./form-controller.js";
import { clientServices } from "../service/client-services.js";
import { capturarCampo } from "./buscar-controller.js";

capturarCampo();
validarFormulario();

function activarBoton(){
    const form = document.querySelector(".form");
    form.addEventListener('submit', (e) => {
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


