import { controlador } from "general-controller.js";
import { idCategoria } from "productList-controller.js";
//Retorna el id de la categoria de la URL
const id = idCategoria();

controlador("UserPage", id + 1, id, 30);