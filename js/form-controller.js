//Validacion del Formulario de contacto

export const validarFormulario = () =>{
    const $input = document.querySelectorAll("[data-input]");

    $input.forEach(element => {
        element.addEventListener('blur', element => {
            element.preventDefault();
            const hijo = element.target;
            const padre = hijo.parentElement;
            const spanError = padre.lastElementChild;
            validar(hijo,spanError,padre);
        });
    });
    
    function validar(hijo,spanError,padre){
        const tipoInput = hijo.dataset.input;
        const iInvalid = padre.querySelector(".contacto__checkInvalid");
        const iValid = padre.querySelector(".contacto__checkValid");
        if(!hijo.validity.valid){
            spanError.classList.add("contacto__invalid--active");
            spanError.innerHTML = MensajeDeError(tipoInput, hijo);
            iInvalid.classList.add('contacto__checkInvalid--active');
            iValid.classList.remove('contacto__checkValid--active');
    
        }
        else{
            spanError.classList.remove("contacto__invalid--active");
            iValid.classList.add('contacto__checkValid--active');
            iInvalid.classList.remove('contacto__checkInvalid--active');
        }
    
    };
    
    const tipoDeErrores = {
        nombre: {
            valueMissing: "Por favor ingrese su nombre",
        },
        email: {
            valueMissing: "Por favor ingrese su email",
            typeMismatch: "El correo que ha ingresado no es valido"
        },
        mensaje: {
            valueMissing: "Por favor ingrese su mensaje"
        }
    };
    function MensajeDeError(tipoDeInput, hijo){
        let mensaje = '';
        Errores.forEach(error => {
            if (hijo.validity[error]){
                mensaje = tipoDeErrores[tipoDeInput][error]
            }
        });
        return mensaje;
    };
    
    const Errores = [
        "valueMissing",
        "typeMismatch"
    ];
}
