import { conectaAPI } from "./conectaAPI.js";
import construyeCard from "./mostrarVideos.js";

async function buscarVideoEvento(evento) {
    evento.preventDefault();

    const datosDeBusqueda = document.querySelector("[data-busqueda]").value.trim();
    console.log("Datos de búsqueda:", datosDeBusqueda);

    try {
        const busqueda = await conectaAPI.buscarVideo(datosDeBusqueda);
        console.log("Resultados de búsqueda:", busqueda);

        const listaDeBusqueda = document.querySelector("[data-lista]");
        listaDeBusqueda.replaceChildren();

        if (!busqueda || busqueda.length === 0) {
            listaDeBusqueda.innerHTML = `<h2 class="mensaje__titulo">No encontramos videos para ese filtro</h2>`;
            return;
        }

        busqueda.forEach(elemento => {
            const titulo = elemento.titulo || "Sin título";
            const descripcion = elemento.descripcion || "Sin descripción";
            const urlCompra = encodeURI(elemento.urlCompra || "#");
            const imagen = elemento.imagen || "https://via.placeholder.com/150";
            const precio = elemento.precio || "No disponible";

            listaDeBusqueda.appendChild(
                construyeCard(titulo, descripcion, urlCompra, imagen, precio)
            );
        });
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        const listaDeBusqueda = document.querySelector("[data-lista]");
        listaDeBusqueda.innerHTML = `<h2 class="mensaje__titulo">Ocurrió un error al realizar la búsqueda. Por favor, intenta nuevamente.</h2>`;
    }
}

const botonBusqueda = document.querySelector("[data-boton-busqueda]");
botonBusqueda.addEventListener("click", evento => buscarVideoEvento(evento));
