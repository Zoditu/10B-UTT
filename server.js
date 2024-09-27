const express = require('express');
const constants = require('./app/utils/constants');
const config = require('./config.json');
const app = express();
app.use(express.json());

let entorno = constants.ENVIRONMENTS.production;
const args = process.argv;
args.forEach(argument => {
    const arg = argument.toLowerCase();
    if(arg.startsWith("--entorno=")){
        let valor = arg.replace("--entorno=", '');
        entorno = constants.ENVIRONMENTS[valor] 
               || constants.ENVIRONMENTS.production;
    }
});

app.post('/escuela', async (req, res) => {
    const body = req.body || {};
    const validate = require('./validation/escuela.validate');
    const escuelaValida = validate.nuevaEscuela(body);

    if(escuelaValida.error) {
        return res.status(400).send(escuelaValida.error);
    }

    const Escuela = require('./app/models/Escuela');
    const nuevaEscuela = new Escuela(body);
    await nuevaEscuela.save();

    res.send({
        ok: true
    });
});

app.get('/escuelas', async (req, res) => {
    const Escuela = require('./app/models/Escuela');
    const escuelas = await Escuela.find();
    res.send(escuelas);
});

const PORT = constants.PORTS[entorno];
app.listen(PORT, function(error) {
    if(error) {
        console.log(error);
        process.exit(0);
    }

    console.log(`Ejecutando en el puerto: ${PORT}`);
    const mongoose = require('mongoose');

    const mongoURL = `${config.mongo[entorno].host}/${config.mongo[entorno].defaultDB}`;
    mongoose.connect(mongoURL).then(() => {
        console.log('Connected: ' + mongoURL);
    }).catch(error => {
        console.error(error);
        process.exit(0);
    });
});