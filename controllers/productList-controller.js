import { clientServices } from "../service/client-services.js";

export const mostrarTodosLosProductos = (pagina) =>{

    const URL =  "http://localhost:3000";

    clientServices.mostrarCategorias(URL, categorizar);  

    function categorizar(lista){
        const crearDiv = document.createElement("div");
        crearDiv.classList.add("productos__contenedor");
        crearDiv.setAttribute(`data-type`, `${lista}`);
        const contenido = 
            `<a href="#" class="producto__categoria">${lista}</a>
            <a href="#" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>
            <ul class="producto__lista"></ul>`
        crearDiv.innerHTML = contenido;
        return crearDiv;
    }
    
    clientServices.obtenerProductos(URL,pagina,mostrarProductos);

    function mostrarProductos(nombre, precio, URLimagen ,tipoPagina,id){
        const Contenedor = document.createElement("li");
        Contenedor.classList.add("producto__contenedor");
        let contenido = '';
        if(tipoPagina == "UserPage"){
            contenido =
            `<div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
            <span class="producto__nombre">${nombre}</span>
            <span class="producto__precio">${precio}</span>
            <a href="#" class="producto__descripcion">Ver producto</a>`;
        }else if(tipoPagina == "AdminPage"){
            contenido =
            `<a href="../screens/editar-producto.html?id=${id}" class="producto__linkEdit"><i class="fas fa-edit producto__iconEdit" data-edit></i></a>
            <i class="fas fa-trash producto__iconTrash" data-trash id=${id}></i>
            <div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
            <span class="producto__nombre">${nombre}</span>
            <span class="producto__precio">${precio}</span>
            <a href="#" class="producto__descripcion">Ver producto</a>`;
        }
        Contenedor.innerHTML = contenido;
        return Contenedor;
        };

};