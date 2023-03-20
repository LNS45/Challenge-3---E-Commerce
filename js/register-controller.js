import { validarFormulario } from "./form-controller.js";

validarFormulario();



const agregarProducto = (categoria,nombre,precio,descripcion,imagen) => {
    const URL =  "http://localhost:3000/productos";
    let objeto = {
        id: uuid.v4(),
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        categoria: categoria,
        imagen: imagen
    };
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(objeto)
    });
}

const btn = document.querySelector(".tabla__boton");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    agregarProducto("Guitarras","Ejemplo","999.99","XD","/saas");
})
