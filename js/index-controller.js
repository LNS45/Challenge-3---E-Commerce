
const $input = document.querySelectorAll("[data-input]");

$input.forEach(element => {
    console.log(element)
    element.addEventListener('blur', element => {
        const hijo = element.target;
        const padre = hijo.parentElement;
        const spanError = padre.lastElementChild;
        validar(hijo,spanError);
    });
});

function validar(hijo,spanError){
    const tipoInput = hijo.dataset.input;
    if(!hijo.validity.valid){
        spanError.classList.add("contacto__invalid--active");
        spanError.innerHTML = MensajeDeError(tipoInput, hijo);

        if(tipoInput == "email"){
            const label = document.querySelector(".label-error");
            console.log(label)
            label.classList.toggle("label__mismatch");
        }

    }
    else{
        spanError.classList.remove("contacto__invalid--active");
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