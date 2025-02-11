function cargarComentarios() {
    fetch('https://codevjose.github.io/codevjose/comentarios.json')
        .then(response => response.json())
        .then(comentarios => {
            var comentariosDiv = document.getElementById("comentarios");
            comentariosDiv.innerHTML = '';
            comentarios.forEach(comentario => {
                comentariosDiv.innerHTML += `<p><strong>${comentario.nombre}:</strong> ${comentario.texto}</p>`;
            });
        });
}

function enviarComentario() {
    var nombre = document.getElementById("nombre").value;
    var texto = document.getElementById("comentario").value;
    var nuevoComentario = { nombre: nombre, texto: texto };

    fetch('https://codevjose.github.io/codevjose/comentarios.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoComentario)
    }).then(response => {
        if (response.ok) {
            cargarComentarios();
        } else {
            console.error('Error al guardar el comentario');
        }
    }).catch(error => {
        console.error('Error al enviar el comentario:', error);
    });
}

window.onload = function() {
    cargarComentarios();
};
