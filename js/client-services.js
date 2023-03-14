
const URL =  "http://localhost:3000";
const Seccion = document.querySelector(".productos");
let listadoCategorias;

//Logica para crear Secciones de categorias
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

function categorizar(lista){
    const crearDiv = document.createElement("div");
    crearDiv.classList.add("productos__contenedor");
    crearDiv.setAttribute(`data-${lista}`, "");
    const contenido = 
        `<a href="#" class="producto__categoria">${lista}</a>
        <a href="#" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>`
    crearDiv.innerHTML = contenido;
    return crearDiv;
}

//Logica para mostrar productos
fetch(`${URL}/productos`)
    .then((response) => response.json())
    .then((productos) =>{

        for(let i = 0; i < listadoCategorias[0].lista.length; i++) {
            let tipo = listadoCategorias[0].lista[i];
            productos.forEach((producto) => {
                if(producto){

                }

                console.log(producto[tipo])
            mostrarProductos();
            });

        }

    })


function mostrarProductos(nombre, precio){
    const Contenedor = document.createElement("li");
    Contenedor.classList.add("producto__contenedor");
    const contenido =
        `<div class="producto__imagen"></div>
        <span class="producto__nombre">${nombre}</span>
        <span class="producto__precio">${precio}</span>
        <a href="#" class="producto__descripcion">Ver producto</a>`
        Contenedor.innerHTML = contenido;
        return Contenedor;
};


/*        for(let i = 0; i < listadoCategorias[0].lista.length; i++) {
            let tipo = listadoCategorias[0].lista[i];
            console.log(tipo)
            for(let a = 0; a < producto.tipo.length; a++ ){
                console.log(producto.tipo[a]);
            }
        }*/ 