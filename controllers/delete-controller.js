import { clientServices } from "../service/client-services.js";

export const obtenerIconosBasura = () => {
    const $iconTrash = document.querySelectorAll("[data-trash]");
    $iconTrash.forEach(basura => {
        basura.addEventListener('click', () => {
            clientServices.eliminarProducto(basura.id);
        });
    });
}
