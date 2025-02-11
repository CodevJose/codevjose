
function cargarComentarios() {
    var comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    var comentariosDiv = document.getElementById("comentarios");
    comentariosDiv.innerHTML = '';
    comentarios.forEach(function(comentario) {
        comentariosDiv.innerHTML += "<p><strong>" + comentario.nombre + ":</strong> " + comentario.texto + "</p>";
    });
}

function enviarComentario() {
    var nombre = document.getElementById("nombre").value;
    var texto = document.getElementById("comentario").value;
    var nuevoComentario = { nombre: nombre, texto: texto };
    
    var comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    cargarComentarios();
}
/*
function borrarComentarios() {
    localStorage.removeItem('comentarios');
    cargarComentarios();
}
*/
window.onload = function() {
    cargarComentarios();
};