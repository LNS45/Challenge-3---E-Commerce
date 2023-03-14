
const URL =  "http://localhost:3000";
const Seccion = document.querySelector(".productos");

fetch(`${URL}/categorias`)
    .then((response) => response.json())
    .then((categorias) => {

        categorias.forEach((categoria) => {
            for(let i = 0; i < categoria.lista.length; i++) {
                const crear = categorizar(categoria.lista[i]);
                Seccion.appendChild(crear);
            };
        });
});

function categorizar(lista){
    const crearDiv = document.createElement("div");
    crearDiv.classList.add("productos__contenedor");
    const contenido = 
        `<div class="productos__contenedor">
            <a href="#" class="producto__categoria">${lista}</a>
            <a href="#" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>
        </div>`
    crearDiv.innerHTML = contenido;
    return crearDiv;
}


//    const crearDiv = document.createElement("div");
//crearDiv.classList.add("productos__contenedor");





