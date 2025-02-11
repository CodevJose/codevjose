const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/comentarios', (req, res) => {
    const nuevoComentario = req.body;
    fs.readFile('comentarios.json', 'utf8', (err, data) => {
        if (err) throw err;
        let comentarios = JSON.parse(data || '[]');
        comentarios.push(nuevoComentario);
        fs.writeFile('comentarios.json', JSON.stringify(comentarios, null, 2), 'utf8', err => {
            if (err) throw err;
            res.status(200).send('Comentario guardado');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
