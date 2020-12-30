const express = require('express');
const Tema = require('../models/temaModel');

let app = express();

app.get('/tema', (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    res.header("Access-Control-Allow-Origin", "*");
    Tema.find().sort('nombre').skip(desde).limit(limite).populate('materia', 'nombre descripcion').exec((err, temasBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            num: temasBD.length,
            tema: temasBD
        });
    })
});

app.get('/tema-materia/:materia', (req, res) => {
    let idMateria = req.params.materia;
    res.header("Access-Control-Allow-Origin", "*");
    Tema.find({ materia: idMateria }).sort('nombre').populate('materia', 'nombre descripcion').exec((err, temasBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            num: temasBD.length,
            tema: temasBD
        });
    })
});

app.get('/tema/:id', (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    Tema.findById(id).populate('materia', 'nombre descripcion').exec((err, temaBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        if (!temaBD) {
            return res.status(401).json({
                ok: false,
                message: `No existe tema con id: ${id}`
            });
        }
        return res.json({
            ok: true,
            tema: temaBD
        });
    });
});

app.post('/tema', (req, res) => {
    let body = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    let tema = new Tema({
        nombre: body.nombre,
        descripcion: body.descripcion,
        materia: body.idMateria
    });
    tema.save((err, temaBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            tema: temaBD
        });
    });
});

app.put('/tema/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    Tema.findById(id, (err, temaBD) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: err.message
            });
        }
        if (!temaBD) {
            return res.status(401).json({
                ok: false,
                message: `No existe la materia con el id: ${id}`
            });
        }
        temaBD.nombre = body.nombre;
        temaBD.descripcion = body.descripcion;
        temaBD.save((err, temaAct) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: err.message
                });
            }
            return res.json({
                ok: true,
                tema: temaAct
            });
        });
    });
});

app.delete('/tema/:id', (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    Tema.findByIdAndDelete(id, (err, temaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        if (!temaBD) {
            return res.status(400).json({
                ok: false,
                message: `No existe tema con id: ${id}`
            });
        }
        return res.json({
            ok: true,
            tema: temaBD
        });
    });
});

module.exports = app;