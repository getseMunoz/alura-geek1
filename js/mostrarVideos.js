import { conectaAPI } from "./conectaAPI.js";

const lista = document.querySelector("[data-lista]");

export default function construyeCard(titulo, imagen, precio, descripcion, urlCompra) {
    const jersey = document.createElement("li");
    jersey.className = "jersey__item";
    
    jersey.innerHTML = `
        <div class="jersey__preview">
            <img src="${imagen}" alt="${titulo}" class="jersey__imagen">
            <div class="jersey__info">
                <h3>${titulo}</h3>
                <p class="jersey__precio">$${precio}</p>
            </div>
        </div>
        <div class="jersey__detalles" style="display: none;">
            <p class="jersey__descripcion">${descripcion}</p>
            <a href="${urlCompra}" target="_blank" class="jersey__comprar">Comprar</a>
        </div>`;

    // Agregar evento click para mostrar/ocultar detalles
    const preview = jersey.querySelector('.jersey__preview');
    const detalles = jersey.querySelector('.jersey__detalles');
    
    preview.addEventListener('click', () => {
        const estaOculto = detalles.style.display === 'none';
        detalles.style.display = estaOculto ? 'block' : 'none';
    });

    return jersey;
}

async function listaJerseys() {
    try {
        const listaAPI = await conectaAPI.listaVideos();
        listaAPI.forEach(element => lista.appendChild(
            construyeCard(
                element.titulo,
                element.imagen,
                element.precio,
                element.descripcion,
                element.marca,
                element.tallas,
                element.urlCompra
               
            )
        ));
    } catch {
        lista.innerHTML = `<h2 class="mensaje__titulo">No fue posible cargar la lista de jerseys</h2>`;
    }
}

listaJerseys();