const express = require('express');
const constants = require('./app/utils/constants');
const config = require('./config.json');
const app = express();
app.use(express.json());
app.use(express.static(
    __dirname + '/app/public')
);

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

const escuelasRouter = require('./app/routers/escuela');
app.use('/escuela', escuelasRouter);

const PORT = constants.PORTS[entorno];
app.listen(PORT, function(error) {
    if(error) {
        console.log(error);
        process.exit(0);
    }

    console.log(`Ejecutando en el puerto: ${PORT}`);
    const mongoose = require('mongoose');

    let mongoURL = `${config.mongo[entorno].host}/${config.mongo[entorno].defaultDB}`;
    if(config.mongo[entorno].params) {
        mongoURL += config.mongo[entorno].params;
    }

    mongoose.connect(mongoURL).then(() => {
        console.log('Connected: ' + mongoURL);
    }).catch(error => {
        console.error(error);
        process.exit(0);
    });
});