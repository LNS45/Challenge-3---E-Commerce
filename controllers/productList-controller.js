import { clientServices } from "../service/client-services.js";
const url = new URL(window.location);
const identificador = url.searchParams.get("id");




//Obtiene toda la info de un producto por su ID
function obtenerProducto(){
    clientServices.detalleProducto(identificador)
    .then((datos)=> {
        mostrarProducto(datos.imagen, datos.nombre, datos.precio, datos.descripcion)
    });
};

//Se llama desde Client Services muestra todo el contenido de productos y categorias dependiendo el tipo de pagina
export const mostrarTodosLosProductos = (pagina, cantidadSecciones, indice, cantidadProductos) =>{
    const URL =  "http://localhost:3000";
    let barraNav = document.createElement("div")
    barraNav.classList.add("nav__contenedor");

    clientServices.mostrarCategorias(URL, categorizar, cantidadSecciones, indice, crearNavCategorias);  
    //Muestra las categorias en la lista de productos
    function categorizar(lista){
        const crearDiv = document.createElement("div");
        crearDiv.classList.add("productos__contenedor");
        crearDiv.setAttribute(`data-type`, `${lista}`);
        const contenido = 
            `<div class="producto__grupoCategoria">
            <span  class="producto__categoria">${lista}</span>
            <a href="#" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>
            </div>
            <ul class="producto__lista"></ul>`
        crearDiv.innerHTML = contenido;
        return crearDiv;
    }

    function crearNavCategorias(lista) {
        const contenido = 
        `<a href="./screens/categoria-producto.html" class="nav__link">${lista[0]}</a>
        <a href="./screens/categoria-producto.html" class="nav__link">${lista[1]}</a> 
        <a href="./screens/categoria-producto.html" class="nav__link">${lista[2]}</a>
        <a href="./screens/categoria-producto.html" class="nav__link">${lista[3]}</a>
        <a href="./screens/categoria-producto.html" class="nav__link">${lista[4]}</a>
        <a href="./screens/categoria-producto.html" class="nav__link">${lista[5]}</a>
        <a href="./screens/categoria-producto.html" class="nav__link">${lista[6]}</a>`;
        barraNav.innerHTML = contenido;
        return barraNav;
    }
    
    //Se llama a la funcion con los parametros obtenidos en MostrarTodosLosProductos
    clientServices.obtenerProductos(URL,pagina,mostrarProductos, cantidadProductos);

    //Muestra los productos dependiendo del tipo de pagina
    function mostrarProductos(nombre, precio, URLimagen ,tipoPagina,id){
            const Contenedor = document.createElement("li");
            Contenedor.classList.add("producto__contenedor");
            let contenido = '';
            if(tipoPagina == "UserPage"){
                contenido =
                `<div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                <span class="producto__nombre">${nombre}</span>
                <span class="producto__precio">${precio}</span>
                <a href="../screens/vista-producto.html?id=${id}" class="producto__descripcion">Ver producto</a>`;
            }else if(tipoPagina == "AdminPage"){
                contenido =
                `<a href="../screens/editar-producto.html?id=${id}" class="producto__linkEdit"><i class="fas fa-edit producto__iconEdit" data-edit></i></a>
                <i class="fas fa-trash producto__iconTrash" data-trash id=${id}></i>
                <div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                <span class="producto__nombre">${nombre}</span>
                <span class="producto__precio">${precio}</span>
                <a href="../screens/vista-producto.html?id=${id}" class="producto__descripcion">Ver producto</a>`;
            }else if(tipoPagina == "ProductoPage"){
                contenido =
                `<div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                <span class="producto__nombre">${nombre}</span>
                <span class="producto__precio">${precio}</span>
                <a href="../screens/vista-producto.html?id=${id}" class="producto__descripcion">Ver producto</a>`;
            }
            Contenedor.innerHTML = contenido;
            return Contenedor;
            };
        if(pagina == "ProductoPage"){
            obtenerProducto();
        }
};
//Muestra el producto en la vista de ver un solo producto
function mostrarProducto(img,nombre,precio,descripcion){
    const div = document.querySelector(".vista__grupo");
    const contenido = 
    `<img src="${img}" alt="" class="vista__imagen">
    <div class="vista__info">
        <h1 class="vista__nombre">${nombre}</h1>
        <span class="vista__precio">${precio}</span>
        <span class="vista__descripcion">${descripcion}</span>
    </div>`;
    div.innerHTML = contenido;
}