import { clientServices } from "../service/client-services.js";
const url = new URL(window.location);
const identificador = url.searchParams.get("id");
const idcat = url.searchParams.get("cat");


export function idCategoria(){
    const categorias = {
        "Guitarras": 0,
        "Bajos": 1,
        "Pedales": 2,
        "Púas": 3,
        "Accesorios": 4,
        "Amplificadores": 5,
        "Cuerdas": 6,
    }
    const categoria = categorias[idcat];
    return categoria 
};


//Obtiene toda la info de un producto por su ID
function obtenerProducto(){
    clientServices.detalleProducto(identificador)
    .then((datos)=> {
        mostrarProducto(datos.imagen, datos.nombre, datos.precio, datos.descripcion, datos.id)
    });
};
//Muestra el producto en la vista de ver un solo producto
function mostrarProducto(img,nombre,precio,descripcion, id){
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

//Se llama desde Client Services muestra todo el contenido de productos y categorias dependiendo el tipo de pagina
export const mostrarTodosLosProductos = (pagina, cantidadSecciones, indice, cantidadProductos) =>{
    const URL =  "https://my-json-server.typicode.com/LNS45/API-Ecommerce-Challenge3-OracleOne";
    let barraNav = document.createElement("div")
    barraNav.classList.add("nav__contenedor");

    clientServices.mostrarCategorias(URL, categorizar, cantidadSecciones, indice, crearNavCategorias, pagina);  
    //Muestra las categorias en la lista de productos
    function categorizar(lista){
        const crearDiv = document.createElement("div");
        crearDiv.classList.add("productos__contenedor");
        crearDiv.setAttribute(`data-type`, `${lista}`);
        let contenido
        if(pagina != "UserPage"){
            contenido = 
            `<div class="producto__grupoCategoria">
            <span  class="producto__categoria">${lista}</span>
            <a href="../screens/categoria-producto.html?cat=${lista}" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>
            </div>
            <ul class="producto__lista"></ul>`
        }
        else if(pagina == "UserPage"){
            contenido =
            `<div class="producto__grupoCategoria">
            <span  class="producto__categoria">${lista}</span>
            <a href="./screens/categoria-producto.html?cat=${lista}" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>
            </div>
            <ul class="producto__lista"></ul>`
        }

        crearDiv.innerHTML = contenido;
        return crearDiv;
    }

    function crearNavCategorias(lista) {
        let contenido = '';
        if(pagina == "UserPage"){
            contenido = 
            `<a href="./screens/categoria-producto.html?cat=${lista[0]}"class="nav__link">${lista[0]}</a>
            <a href="./screens/categoria-producto.html?cat=${lista[1]}" class="nav__link">${lista[1]}</a> 
            <a href="./screens/categoria-producto.html?cat=${lista[2]}" class="nav__link">${lista[2]}</a>
            <a href="./screens/categoria-producto.html?cat=${lista[3]}" class="nav__link">${lista[3]}</a>
            <a href="./screens/categoria-producto.html?cat=${lista[4]}" class="nav__link">${lista[4]}</a>
            <a href="./screens/categoria-producto.html?cat=${lista[5]}" class="nav__link">${lista[5]}</a>
            <a href="./screens/categoria-producto.html?cat=${lista[6]}" class="nav__link">${lista[6]}</a>`;
        }
        else if(pagina == "CatPage"){
            contenido = 
            `<a href="./categoria-producto.html?cat=${lista[0]}"class="nav__link">${lista[0]}</a>
            <a href="./categoria-producto.html?cat=${lista[1]}" class="nav__link">${lista[1]}</a> 
            <a href="./categoria-producto.html?cat=${lista[2]}" class="nav__link">${lista[2]}</a>
            <a href="./categoria-producto.html?cat=${lista[3]}" class="nav__link">${lista[3]}</a>
            <a href="./categoria-producto.html?cat=${lista[4]}" class="nav__link">${lista[4]}</a>
            <a href="./categoria-producto.html?cat=${lista[5]}" class="nav__link">${lista[5]}</a>
            <a href="./categoria-producto.html?cat=${lista[6]}" class="nav__link">${lista[6]}</a>`;
        }
        barraNav.innerHTML = contenido;
        return barraNav;
    }
    
    //Se llama a la funcion con los parametros obtenidos en MostrarTodosLosProductos
    clientServices.obtenerProductos(URL,pagina,mostrarProductos, cantidadProductos);

    //Muestra los productos dependiendo del tipo de pagina
    function mostrarProductos(nombre, precio, URLimagen ,tipoPagina,id,cat){
        const seccion = document.querySelector(".productos");
        const Contenedor = document.createElement("li");
        Contenedor.setAttribute(`data-type`, `${id}`);
        Contenedor.setAttribute('data-aos',"fade-right");
        Contenedor.setAttribute('data-aos-delay',"350");
        Contenedor.setAttribute('data-aos-once',"true");
        Contenedor.setAttribute('data-aos-duration',"9000");
        Contenedor.classList.add("producto__contenedor");
        let contenido = '';
            if(tipoPagina == "UserPage"){
                contenido =
                `<div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                <span class="producto__nombre">${nombre}</span>
                <span class="producto__precio">${precio}</span>
                <a href="screens/vista-producto.html?id=${id}&cat=${cat}" class="producto__descripcion">Ver producto</a>`;
            }else if(tipoPagina == "AdminPage"){
                contenido =
                `<a href="./editar-producto.html?id=${id}" class="producto__linkEdit"><i class="fas fa-edit producto__iconEdit" data-edit></i></a>
                <i class="fas fa-trash producto__iconTrash" data-trash id=${id}></i>
                <div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                <span class="producto__nombre">${nombre}</span>
                <span class="producto__precio">${precio}</span>
                <a href="./vista-producto.html?id=${id}&cat=${cat}" class="producto__descripcion">Ver producto</a>`;
            }else if(tipoPagina == "ProductoPage"){
                    contenido =
                    `<div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                    <span class="producto__nombre">${nombre}</span>
                    <span class="producto__precio">${precio}</span>
                    <a href="./vista-producto.html?id=${id}&cat=${cat}" class="producto__descripcion">Ver producto</a>`;
            }else if(tipoPagina == "CatPage"){
                contenido =
                `<div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
                <span class="producto__nombre">${nombre}</span>
                <span class="producto__precio">${precio}</span>
                <a href="./vista-producto.html?id=${id}&cat=${cat}" class="producto__descripcion">Ver producto</a>`;
            }
            Contenedor.innerHTML = contenido;

            return Contenedor;
            };
        if(pagina == "ProductoPage"){
            obtenerProducto();
        }
};

export function evitarDoble(li){
    let identico = null;
    if(identificador == li.dataset.type){
        identico = li.dataset.type;
    }
    return [li, identico];
}

