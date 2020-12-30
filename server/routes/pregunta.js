const express = require('express');
const Pregunta = require('../models/preguntaModel');

let app = express();

app.get('/pregunta', (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    res.header("Access-Control-Allow-Origin", "*");
    Pregunta.find().sort('nombre').skip(desde).limit(limite).populate('tema', 'nombre descripcion').exec((err, preguntasBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            num: preguntasBD.length,
            preguntas: preguntasBD
        });
    })
});

app.get('/pregunta/:id', (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    Pregunta.findById(id).populate('tema', 'nombre descripcion').exec((err, preguntaBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        if (!preguntaBD) {
            return res.status(401).json({
                ok: false,
                message: `No existe pregunta con id: ${id}`
            });
        }
        return res.json({
            ok: true,
            pregunta: preguntaBD
        });
    });
});

app.get('/pregunta-tema/:tema', (req, res) => {
    let idTema = req.params.tema;
    res.header("Access-Control-Allow-Origin", "*");
    Pregunta.find({ tema: idTema }).populate('tema', 'nombre descripcion').exec((err, preguntasBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        if (!preguntasBD) {
            return res.status(401).json({
                ok: false,
                message: `No existe pregunta con id: ${id}`
            });
        }
        return res.json({
            ok: true,
            preguntasBD: preguntasBD
        });
    });
});

app.post('/pregunta', (req, res) => {
    let body = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    let pregunta = new Pregunta({
        pregunta: body.pregunta,
        respuesta1: body.respuesta1,
        respuesta2: body.respuesta2,
        respuesta3: body.respuesta3,
        respuesta4: body.respuesta4,
        imagen: body.imagen,
        tema: body.temaId
    });
    pregunta.save((err, preguntaBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            pregunta: preguntaBD
        });
    });
});

app.put('/pregunta/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    Pregunta.findById(id, (err, preguntaBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        if (!preguntaBD) {
            return res.status(401).json({
                ok: false,
                message: `No existe la materia con el id: ${id}`
            });
        }
        preguntaBD.pregunta = body.pregunta;
        preguntaBD.respuesta1 = body.respuesta1;
        preguntaBD.respuesta2 = body.respuesta2;
        preguntaBD.respuesta3 = body.respuesta3;
        preguntaBD.respuesta4 = body.respuesta4;
        preguntaBD.imagen = body.imagen;
        preguntaBD.save((err, preguntaAct) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: err.message
                });
            }
            return res.json({
                ok: true,
                pregunta: preguntaAct
            });
        });
    });
});

app.delete('/pregunta/:id', (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    Pregunta.findByIdAndDelete(id, (err, preguntaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        if (!preguntaBD) {
            return res.status(400).json({
                ok: false,
                message: `No existe pregunta con id: ${id}`
            });
        }
        return res.json({
            ok: true,
            pregunta: preguntaBD
        });
    });
});

module.exports = app;