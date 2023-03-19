export const mostrarTodosLosProductos = (pagina) =>{

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
        crearDiv.setAttribute(`data-type`, `${lista}`);
        const contenido = 
            `<a href="#" class="producto__categoria">${lista}</a>
            <a href="#" class="producto__vermas">Ver más<i class="fas fa-arrow-right"></i></a>
            <ul class="producto__lista"></ul>`
        crearDiv.innerHTML = contenido;
        return crearDiv;
    }
    
    //Logica para mostrar productos
    fetch(`${URL}/productos`)
        .then((response) => response.json())
        .then((productos) =>{
    let indice = 0;
    let contenedores = document.querySelectorAll("[data-type]");
    console.log(contenedores)
            productos.forEach(producto => {
                    let tipo = recorrerCategorias(indice)
                    indice+=1;
                    for(let i = 0;i <= producto[tipo].length - 1; i++){
                        const listarProducto = mostrarProductos(producto[tipo][i].nombre, producto[tipo][i].precio,producto[tipo][i].imagen, pagina);
                        contenedores.forEach(contenedor => {
                            if(tipo == contenedor.dataset.type){
                                const ul = contenedor.querySelector(".producto__lista");
                                ul.appendChild(listarProducto);
                            };
                        });
                    };
            });
        }).catch((error) => {
            console.log("Ha ocurrido un error: " + error)
        })
    
    function recorrerCategorias(i){
        let tipo = listadoCategorias[0].lista[i];
        return tipo;
    };



    function mostrarProductos(nombre, precio, URLimagen ,tipoPagina){
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
            `<i class="fas fa-edit producto__iconEdit"></i>
            <i class="fas fa-trash producto__iconTrash"></i>
            <div class="producto__imagen"><img src="${URLimagen}" alt="Producto" class="producto__imagen"></div>
            <span class="producto__nombre">${nombre}</span>
            <span class="producto__precio">${precio}</span>
            <a href="#" class="producto__descripcion">Ver producto</a>`;
        }
        Contenedor.innerHTML = contenido;
        return Contenedor;
        };

};


//                            const iconos = agregarIconos();
//listarProducto.appendChild(iconos);