const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('comentarios', (req, res) => {
    const nuevoComentario = req.body;
    fs.readFile('comentarios.json', 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // Si el archivo no existe, lo crea
            return fs.writeFile('comentarios.json', JSON.stringify([nuevoComentario], null, 2), 'utf8', err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error al guardar el comentario');
                }
                res.status(200).send('Comentario guardado');
            });
        } else if (err) {
            console.error(err);
            return res.status(500).send('Error al leer los comentarios');
        }

        let comentarios = JSON.parse(data || '[]');
        comentarios.push(nuevoComentario);
        fs.writeFile('comentarios.json', JSON.stringify(comentarios, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al guardar el comentario');
            }
            res.status(200).send('Comentario guardado');
        });
    });
});

