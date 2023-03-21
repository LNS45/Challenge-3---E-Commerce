import { validarFormulario } from "./form-controller.js";

validarFormulario();

function activarBoton(){
    const btn = document.querySelector(".tabla__boton");
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const campos = capturarCampos();
        agregarProducto(campos[1], campos[2],campos[3],campos[4],campos[0]);
    });
};

const agregarProducto = (categoria,nombre,precio,descripcion,imagen) => {
    const URL =  "http://localhost:3000/productos";
    let plantilla = {
        id: uuid.v4(),
        nombre: nombre,
        precio: `$${precio}`,
        descripcion: descripcion,
        categoria: categoria,
        imagen: imagen
    };
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(plantilla)
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

