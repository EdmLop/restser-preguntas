const express = require('express');
const Materia = require('../models/materiaModel');

let app = express();

app.get('/materia', (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    Materia.find().sort('nombre').skip(desde).limit(limite).exec((err, materiasBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            num: materiasBD.length,
            materia: materiasBD
        });
    })
});

app.get('/materia/:id', (req, res) => {
    let id = req.params.id;
    Materia.findById(id).exec((err, materiaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        if (!materiaBD) {
            return res.status(400).json({
                ok: false,
                message: `No existe la materia con el id: ${id}`
            });
        }
        return res.json({
            ok: true,
            materia: materiaBD
        });
    });
});

app.post('/materia', (req, res) => {
    let body = req.body;
    let materia = new Materia({
        nombre: body.nombre,
        descripcion: body.descripcion
    });
    materia.save((err, materiaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        return res.json({
            ok: true,
            materia: materiaBD
        });
    });
});

app.put('/materia/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Materia.findById(id, (err, materiaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        if (!materiaBD) {
            return res.status(400).json({
                ok: false,
                message: `No existe la materia con el id: ${id}`
            });
        }
        materiaBD.nombre = body.nombre;
        materiaBD.descripcion = body.descripcion;
        materiaBD.save((err, materiaAct) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err.message
                });
            }
            return res.json({
                ok: true,
                materia: materiaAct
            });
        });
    });
});

app.delete('/materia/:id', (req, res) => {
    let id = req.params.id;
    Materia.findByIdAndDelete(id, (err, materiaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        }
        if (!materiaBD) {
            return res.status(400).json({
                ok: false,
                message: `No existe la materia con el id: ${id}`
            });
        }
        return res.json({
            ok: true,
            materia: materiaBD
        });
    });
});

module.exports = app;