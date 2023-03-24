import { obtenerIconosBasura } from "../controllers/delete-controller.js";

//Logica para crear Secciones de categorias
const mostrarCategorias = (URL, categorizar) => {
    const Seccion = document.querySelector(".productos");
    let listadoCategorias;
    fetch(`${URL}/categorias`)
        .then((response) => response.json())
        .then((categorias) => {
            listadoCategorias = categorias;
            categorias.forEach((categoria) => {
                for(let i = 0; i < categoria.lista.length; i++) {
                    const crear = categorizar(categoria.lista[i]);
                    Seccion.appendChild(crear);
                };
            });
    }).catch((error) => {
        console.log("Ha ocurrido un error: " + error)
    })
} 

//Logica para mostrar productos
const obtenerProductos = (URL,pagina,mostrarProductos) => {
    fetch(`${URL}/productos`)
        .then((response) => response.json())
        .then((productos) =>{
    let contenedores = document.querySelectorAll("[data-type]");
            productos.forEach(producto => {  
                const listarProducto = mostrarProductos(producto.nombre, producto.precio,producto.imagen, pagina, producto.id);
                contenedores.forEach(contenedor => {
                    if(producto.categoria == contenedor.dataset.type){
                        const ul = contenedor.querySelector(".producto__lista");
                        ul.appendChild(listarProducto);
                        };
                });
            });
        }).then(() => {
            //Obtiene los iconos de basura y editar de cada producto cuando ya se cargaron los productos
            if(pagina == "AdminPage"){
                obtenerIconosBasura();
            };
        }).catch((error) => {
            console.log("Ha ocurrido un error: " + error)
        })
    };


//Agregar Producto
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
    }).then(() => {
        window.location.href = "../screens/tarea-completada.html";
    }).catch(() => {
        window.location.href = "../screens/tarea-fallida.html";
    });
};

//Eliminar Productos
const eliminarProducto = (id) => {
    fetch(`http://localhost:3000/productos/${id}`,{
        method: "DELETE",
    })
    .then(() => {
        window.location.href = "../screens/tarea-completada.html";
    })
    .catch(() => {
        window.location.href = "../screens/tarea-fallida.html";
    })
};

//Editar Productos
const editarProducto = (id,nombre,precio,descripcion,categoria,imagen) => {
    let plantilla = {
        nombre: nombre,
        precio: `$${precio}`,
        descripcion: descripcion,
        categoria: categoria,
        imagen: imagen
    };
    fetch(`http://localhost:3000/productos/${id}`,{
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(plantilla)
    }).then(() => {
        window.location.href = "../screens/tarea-completada.html";
    }).catch(() => {
        window.location.href = "../screens/tarea-fallida.html";
    })
}
//Recupera datos por id
const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then(respuesta => respuesta.json());
};

export const clientServices = {
    mostrarCategorias,
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    detalleProducto
}