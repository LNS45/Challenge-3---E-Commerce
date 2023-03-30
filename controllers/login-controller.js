import { validarFormulario } from "./form-controller.js";
import { clientServices } from "../service/client-services.js";
import { capturarCampo } from "./buscar-controller.js";

validarFormulario();
capturarCampo();

//Redireccion a la pagina del admin



function funcionamientoBtn(){
    const btn = document.querySelector(".login__boton");
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        validarContra();
    });

}
function validarContra(){
    const usuario = document.querySelector('[data-input="Usuario_Login"]');
    const password = document.querySelector('[data-input="Password_Login"]');
    const datosIncorrectos = document.querySelector(".login__invalidSubmit");
    clientServices.infoCuenta(usuario.value , password.value, datosIncorrectos);
}
funcionamientoBtn();
