//Validacion del Formulario de contacto

//Funcion que da funcionalidad a los formularios
export const validarFormulario = () =>{
    const $input = document.querySelectorAll("[data-input]");

    $input.forEach(element => {
        element.addEventListener('blur', element => {
            element.preventDefault();
            const hijo = element.target;
            const padre = hijo.parentElement;
            const spanError = padre.lastElementChild;
            if(hijo.dataset.input.includes("Producto")){
                validar(hijo,spanError,padre,"tabla");
            }else if(hijo.dataset.input.includes("Login")){
                validar(hijo,spanError,padre,"login");
            } else {
                validar(hijo,spanError,padre, "contacto");
            }
        });
    });
    
    function validar(hijo,spanError,padre,tipo){
        const tipoInput = hijo.dataset.input;
        const iInvalid = padre.querySelector(`.${tipo}__checkInvalid`);
        const iValid = padre.querySelector(`.${tipo}__checkValid`);
        if(!hijo.validity.valid){
            spanError.classList.add(`${tipo}__invalid--active`);
            spanError.innerHTML = MensajeDeError(tipoInput, hijo);
            iInvalid.classList.add(`${tipo}__checkInvalid--active`);
            iValid.classList.remove(`${tipo}__checkValid--active`);
        }
        else{
            if(tipoInput == "categoriaProducto" && hijo.value == "Selecciona"){
                iInvalid.classList.add(`${tipo}__checkInvalid--active`);
            }else if(tipoInput == "categoriaProducto" && !hijo.value == "Selecciona"){
                iInvalid.classList.remove(`${tipo}__checkInvalid--active`);
            }
            else{
                spanError.classList.remove(`${tipo}__invalid--active`);
                iValid.classList.add(`${tipo}__checkValid--active`);
                iInvalid.classList.remove(`${tipo}__checkInvalid--active`);
            }
        }
    
    };
    
    const tipoDeErrores = {
        nombre: {
            valueMissing: "Por favor ingrese su nombre",
        },
        email: {
            valueMissing: "Por favor ingrese su email",
            typeMismatch: "El correo que ha ingresado no es valido",
            patternMismatch: "Ingrese un correo no valido"
        },
        mensaje: {
            valueMissing: "Por favor ingrese su mensaje"
        },
        imagenProducto:{
            valueMissing: "Por favor ingrese la URL de la imagen de su producto"
        },
        categoriaProducto:{
            valueMissing: "Por favor seleccione una categoria para su producto"
        },
        nombreProducto:{
            valueMissing: "Por favor ingrese el nombre de su producto"
        },
        precioProducto:{
            valueMissing: "Por favor ingrese el precio de su producto",
            patternMismatch: 'Solo ingrese numeros, use "," para separar miles y "." para decimales'
        },
        descripcionProducto:{
            valueMissing: "Por favor ingrese una descripcion para su producto"
        },
        Usuario_Login:{
            valueMissing: "Por favor ingrese un usuario"
        },
        Password_Login:{
            valueMissing:"Por favor ingrese una contraseña",
            patternMismatch: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
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
        "typeMismatch",
        "patternMismatch"
    ];
}
