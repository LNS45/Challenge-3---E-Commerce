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
                const listarProducto = mostrarProductos(producto.nombre, producto.precio,producto.imagen, pagina);
                contenedores.forEach(contenedor => {
                    if(producto.categoria == contenedor.dataset.type){
                        const ul = contenedor.querySelector(".producto__lista");
                        ul.appendChild(listarProducto);
                        };
                });
            });
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
    })
};

export const clientServices = {
    mostrarCategorias,
    obtenerProductos,
    agregarProducto
}