const express = require('express');
const router = express.Router();
const Escuela = require('../models/Escuela');
const Backup = require('../models/Backup');
const Log = require('../models/Log');

const MAX_PAGING = 3;

router.post('/new', async (req, res) => {
    const body = req.body || {};
    const validate = require('../../validation/escuela.validate');
    const escuelaValida = validate.nuevaEscuela(body);

    await new Log({
        method: 'POST',
        endpoint: '/escuela/new',
        data: req.body || {},
        geoLocation: req.ipInfo,
        params: {
            query: req.query || {},
            path: req.params || {}
        },
        time: new Date()
    }).save();

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

    await new Log({
        method: 'GET',
        endpoint: '/escuela/all',
        data: req.body || {},
        geoLocation: req.ipInfo,
        params: {
            query: req.query || {},
            path: req.params || {}
        },
        time: new Date()
    }).save();

    const query = req.query;
    const filter = {};
    if(query.name) {
        filter.nombre = new RegExp(query.name, 'i');
    }

    const escuelas = await Escuela.find(filter);
    let result = [];
    let max = MAX_PAGING;

    if(query.i) {

        if(!isNaN(query.max)) {
            max = query.max < max ? parseInt(query.max) : max;
        }

        if(!isNaN(query.i)) {
            query.i = parseInt(query.i);
        }

        for(let i = query.i; i < (query.i + max) && i < escuelas.length; i++) {
            result.push(escuelas[i]);
        }
    } else {
        result = escuelas;
    }

    
    res.send(result);
});

router.get('/:clave_registro', async (req, res) => {

    await new Log({
        method: 'GET',
        endpoint: '/escuela/:clave_registro',
        data: req.body || {},
        geoLocation: req.ipInfo,
        params: {
            query: req.query || {},
            path: req.params || {}
        },
        time: new Date()
    }).save();

    //Verificar que exista la escuela
    const existe = await Escuela.findOne({
        $or: [
            {clave: req.params.clave_registro},
            {registro: req.params.clave_registro}
        ]
    });

    if(!existe) {
        return res.status(404).send({
            message: `La escuela con la clave o registro {${req.params.clave_registro}} no existe`
        });
    }

    res.send(existe);
});

router.put('/:clave_registro', async (req, res) => {

    await new Log({
        method: 'PUT',
        endpoint: '/escuela/:clave_registro',
        data: req.body || {},
        geoLocation: req.ipInfo,
        params: {
            query: req.query || {},
            path: req.params || {}
        },
        time: new Date()
    }).save();

    const body = req.body || {};

    //Verificar que exista la escuela
    const existe = await Escuela.findOne({
        $or: [
            {clave: req.params.clave_registro},
            {registro: req.params.clave_registro}
        ]
    });

    if(!existe) {
        return res.status(404).send({
            message: `La escuela con la clave o registro {${req.params.clave_registro}} no existe`
        });
    }

    const keys = Object.keys(body);
    for(let i = 0; i < keys.length; i++) {
        const property = keys[i];
        switch(property) {
            case "nombre":
            case "registro":
            case "colaboradores":
            case "estudiantes":
            case "carreras":
                existe[property] = body[property];
                break;
        }
    }

    await existe();

    res.send({
        ok: true
    });
});

router.delete('/:clave_registro', async (req, res) => { 

    await new Log({
        method: 'DELETE',
        endpoint: '/escuela/:clave_registro',
        data: req.body || {},
        geoLocation: req.ipInfo,
        params: {
            query: req.query || {},
            path: req.params || {}
        },
        time: new Date()
    }).save();

    const clave_registro = req.params.clave_registro;
    const existe = await Escuela.findOne( {$or: [
        {clave: clave_registro},
        {registro: clave_registro}
    ]});

    if(existe) {
        const backup = new Backup({
            collection: "Escuelas",
            data: existe.toObject()
        });
        await backup.save();

        await Escuela.deleteOne({$or: [
            {clave: clave_registro},
            {registro: clave_registro}
        ]});
    }
    
    res.send({
        ok: true
    });
});

/*router.get('/clear', async (req, res) => {
    await Escuela.deleteMany({});
    res.send({ok: true});
});*/

module.exports = router;