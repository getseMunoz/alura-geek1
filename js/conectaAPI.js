const API_URL = 'http://localhost:3000/videos';

async function listaVideos() {
    const conexion = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

async function crearVideo(titulo, descripcion, url, imagen) {
    const conexion = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descripcion: `${descripcion} mil visualizaciones`,
            url: url,
            imagen: imagen
        })
    });

    if (!conexion.ok) {
        throw new Error("No fue posible enviar el video");
    }

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}



async function buscarVideo(referencia) {
    const conexion = await fetch(`${API_URL}?q=${encodeURIComponent(referencia)}`);
    if (!conexion.ok) {
        throw new Error('Error en la búsqueda');
    }
    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}









async function eliminarVideo(id) {
    const conexion = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });

    if (!conexion.ok) {
        throw new Error("No fue posible eliminar el video");
    }

    return "Video eliminado exitosamente";
}

async function actualizarVideo(id, titulo, descripcion, url, imagen) {
    const conexion = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descripcion: descripcion,
            url: url,
            imagen: imagen
        })
    });

    if (!conexion.ok) {
        throw new Error("No fue posible actualizar el video");
    }

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

export const conectaAPI = {
    listaVideos,
    crearVideo,
    buscarVideo,
    eliminarVideo,
    actualizarVideo
};
