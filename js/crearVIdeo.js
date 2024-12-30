import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector("[data-formulario]");

//validaciones

async function crearVideo(evento){
    evento.preventDefault();
    const titulo= document.querySelector("[data-titulo]").value;
    const imagen= document.querySelector("[data-imagen]").value;
    const precio=document.querySelector("[data-precio]").value;
    const descripcion = Math.floor(Math.random*10).toString();
    const marca=document.querySelector("[data-marca]").value;
    const tallas=document.querySelector("[data-tallas]").value;
    const urlCompra=document.querySelector("[data-urlCompra]").value;
    


    try{
        await conectaAPI.crearVideo(titulo,imagen,precio,descripcion,marca,tallas,urlCompra)
    
        window.location.href="../pages/envio-concluido.html"
    }catch(e){
        alert(e);
    }
}

formulario,addEventListener("submit",evento=>crearVideo(evento));