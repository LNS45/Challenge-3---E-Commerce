import { obtenerIconosBasura } from "../controllers/delete-controller.js";
import { evitarDoble } from "../controllers/productList-controller.js";
import { buscar } from "../controllers/buscar-controller.js";

let listadoCategorias;
//Logica para crear Secciones de categorias
const mostrarCategorias = (URL, categorizar, cantidad, indice, crearNavCategorias,pagina) => {
    const Seccion = document.querySelector(".productos");
    const nav = document.querySelector(".nav");
    fetch(`${URL}/categorias`)
        .then((response) => response.json())
        .then((categorias) => {
            listadoCategorias = categorias;
            categorias.forEach((categoria) => {
                if(pagina == "UserPage" || "CatPage"){
                    let links = crearNavCategorias(categoria.lista);
                    nav.appendChild(links);
                }
                for(let i = indice; i < cantidad; i++) {
                    const crear = categorizar(categoria.lista[i]);
                    Seccion.appendChild(crear);
                };
            });
    }).catch((error) => {
        console.log("Ha ocurrido un error: " + error)
    })
} 

//Logica para mostrar productos
const obtenerProductos = (URL,pagina,mostrarProductos, cantidadProductos) => {
    fetch(`${URL}/productos`)
        .then((response) => response.json())
        .then((productos) =>{
    //Captura todos los contenedores
    let contenedores = document.querySelectorAll("[data-type]");
                //Por cada producto ejecuta una funcion
                productos.forEach(producto => {  
                    //Guarda el li del producto
                    const listar = mostrarProductos(producto.nombre, producto.precio,producto.imagen, pagina, producto.id, producto.categoria);
                    //Guarda el retorno li despues de evaluar si es producto repetido en la vista de un producto
                    let listarProducto = evitarDoble(listar)[0];
                    //Guarda el id del producto repetido, por defecto regresa null
                    const indice = evitarDoble(listar)[1];
                    //Por cada contenedor recupera el ul y agrega el li dependiendo de su categoria
                    contenedores.forEach(contenedor => {
                        const ul = contenedor.querySelector(".producto__lista");
                        if(producto.categoria == contenedor.dataset.type){
                            ul.appendChild(listarProducto);
                        };
                    });
                    //Revisa que no sea null recupera el ul y el li del repetido y lo elimina
                    if(indice != null){
                        const liRepetido = document.querySelector(`[data-type="${indice}"]`);
                        const ul = document.querySelector(".producto__lista");
                        ul.removeChild(liRepetido)
                    }
                });
            
        }).then(() => {
            //Obtiene los iconos de basura y editar de cada producto cuando ya se cargaron los productos
            if(pagina == "AdminPage"){
                obtenerIconosBasura();
            };
        }).then(() => {
            //Limita cantidad de productos a mostrar
            let contenedores = document.querySelectorAll("[data-type]");
            contenedores.forEach(contenedor => {
                for(let i = 0; i < listadoCategorias[0].lista.length; i++){
                    const conteo = listadoCategorias[0].lista[i]
                        if(document.querySelector(`[data-type="${conteo}"]`) != null){
                            const div = document.querySelector(`[data-type="${conteo}"]`);
                            const hijodiv = div.querySelector(".producto__lista");
                            const numeroProductos = hijodiv.childElementCount
                            if(numeroProductos > cantidadProductos){
                                const productos = hijodiv.children;
                                while(hijodiv.childElementCount > cantidadProductos){
                                    hijodiv.removeChild(productos[productos.length - 1])
                                }
                            }
                        }
                }
            });
        })
        .catch((error) => {
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

//Recuperar info de Cuentas
const infoCuenta = (usuario, contra, error) => {
    fetch('http://localhost:3000/cuentas')
    .then(response => response.json())
    .then((cuentas) => {
        cuentas.forEach(cuenta => {
            if(cuenta.user == usuario && cuenta.password == contra){
                window.location.href = "../screens/admin-page.html";
                error.classList.remove("login__invalidSubmit--active");
            }
            else{
                error.classList.add("login__invalidSubmit--active");
            }
        });
    })
    .catch((error) => {
        console.log("Ha ocurrido un error: " + error)
    });
}
const busquedaProductos = (busqueda, lista) => {
    fetch("http://localhost:3000/productos")
        .then((response) => response.json())
        .then((productos) =>{
            productos.forEach(producto => {
                buscar(producto.imagen, producto.nombre, producto.precio, producto.categoria, producto.id, busqueda, lista);
            });
            const ul = document.querySelector(".busqueda__lista");
            if(ul.childElementCount == 0){
                const error = document.querySelector(".busqueda__error");
                error.style.visibility = 'visible'
            }
        })
}


export const clientServices = {
    mostrarCategorias,
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    detalleProducto,
    infoCuenta,
    busquedaProductos
}