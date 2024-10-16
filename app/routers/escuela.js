const express = require('express');
const router = express.Router();
const Escuela = require('../models/Escuela');

router.post('/new', async (req, res) => {
    const body = req.body || {};
    const validate = require('../../validation/escuela.validate');
    const escuelaValida = validate.nuevaEscuela(body);

    //Inversión
    if(escuelaValida.error) {
        return res.status(400).send(escuelaValida.error.details);
    }

    //Verificar que no haya duplicados
    const duplicado = await Escuela.findOne({
        $or: [
            {clave: body.clave},
            {registro: body.registro}
        ]
    });

    if(duplicado) {
        return res.status(409).send({
            message: "La clave o registro escolar ya existen",
            info: body
        });
    }

    const nuevaEscuela = new Escuela(body);
    await nuevaEscuela.save();

    res.send({
        ok: true
    });
});

router.get('/all', async (req, res) => {
    const escuelas = await Escuela.find();
    res.send(escuelas);
});

router.delete('/:clave_registro', async (req, res) => { 
    const clave_registro = req.params.clave_registro;
    const existe = await Escuela.findOne( {$or: [
        {clave: clave_registro},
        {registro: clave_registro}
    ]});

    if(!existe) {
        return res.status(404).send({
            message: "La escuela con la clave o registro no existe",
            info: clave_registro
        });
    }

    await Escuela.deleteOne({$or: [
        {clave: clave_registro},
        {registro: clave_registro}
    ]});
    
    res.send({
        ok: true
    });
});

router.get('/clear', async (req, res) => {
    await Escuela.deleteMany({});
    res.send({ok: true});
});

module.exports = router;