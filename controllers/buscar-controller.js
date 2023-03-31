import { clientServices } from "../service/client-services.js";

export function buscar(imagen,nombre,precio,categoria,id, palabra, lista){
    const url = new URL(window.location);
    
    function filtrar(palabra, ul, nombre, categoria, precio,id, imagen){
        const minusNombre = nombre.toLowerCase();   
        const minusCat = categoria.toLowerCase();
        if(nombre.includes(palabra) || categoria.includes(palabra) || minusNombre.includes(palabra) || minusCat.includes(palabra)){
            const item = crearLista(imagen,nombre,precio,id,categoria);
            ul.appendChild(item);
        }
    }
    
    function crearLista(imagen,nombre,precio,id,categoria){
        const li = document.createElement("li");
        li.classList.add("producto__contenedor");
        let contenido = '';
        if(url.pathname.includes("screen")){
            contenido =
            `<div class="producto__imagen"><img src="${imagen}" alt="Producto" class="producto__imagen"></div>
            <span class="producto__nombre">${nombre}</span>
            <span class="producto__precio">${precio}</span>
            <a href="../screens/vista-producto.html?id=${id}&cat=${categoria}" class="producto__descripcion">Ver producto</a>`;
        }else{
            contenido =
            `<div class="producto__imagen"><img src="${imagen}" alt="Producto" class="producto__imagen"></div>
            <span class="producto__nombre">${nombre}</span>
            <span class="producto__precio">${precio}</span>
            <a href="screens/vista-producto.html?id=${id}&cat=${categoria}" class="producto__descripcion">Ver producto</a>`;
        }
        li.innerHTML = contenido;
        return li;
    }
    filtrar(palabra,lista, nombre, categoria, precio, id, imagen)
    const input = document.querySelector(".barra__input");
    input.value = '';
}

export function capturarCampo (){
    const form = document.querySelector(".barra__form");
    let pantalla = document.querySelector(".busqueda");
    const exit = document.querySelector(".busqueda__salir");
    const contenedor = document.querySelector(".busqueda__contenedor")
    const pagina = document.querySelector("main");

    exit.addEventListener('click', () => {
        pantalla.style.visibility = 'hidden';
        const error = document.querySelector(".busqueda__error");
        error.style.visibility = 'hidden'
        contenedor.removeChild(document.querySelector(".busqueda__lista"))
        pagina.style.filter = 'blur(0px)'
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ul = document.createElement('ul');
        ul.classList.add("busqueda__lista");
        contenedor.appendChild(ul);
        const input = document.querySelector(".barra__input").value;
        const letraMayus = input.charAt(0).toUpperCase();
        const residuoLetra = input.slice(1);
        const tituloBusqueda = document.querySelector(".busqueda__titulo")
        const busqueda = `${letraMayus}${residuoLetra}`;
        tituloBusqueda.innerHTML = `Mostrando Resultados de... "${input}"`;
        pantalla.style.visibility = 'visible';
        //console.log(palabra.includes("dinero"))
        clientServices.busquedaProductos(busqueda, ul)
        pagina.style.filter = 'blur(3px)'
    });
};