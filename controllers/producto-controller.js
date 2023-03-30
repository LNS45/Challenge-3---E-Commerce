import { controlador } from "general-controller.js";
import { idCategoria } from "productList-controller.js";
const id = idCategoria();

controlador("ProductoPage", id + 1, id, 4);
