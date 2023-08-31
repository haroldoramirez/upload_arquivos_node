const express = require('express');
const app = express();
const multer = require('multer'); //Middleware de upload
const path = require('path');

const PORT = 8989;

app.set('view engine', 'ejs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});

const middlewareUpload = multer({storage});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', middlewareUpload.single('arquivo'), (req, res) => {
    res.send('Arquivo recebido');
});

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT);
});