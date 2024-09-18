const express = require('express');
const constants = require('./app/utils/constants');
const config = require('./config.json');
const app = express();

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

app.get('/test', async (req, res) => {
    res.send("Hola");
});

const PORT = entorno === constants.ENVIRONMENTS.local ? 
             constants.PORTS[entorno] : constants.PORTS.production;
app.listen(PORT, function(error) {
    if(error) {
        console.log(error);
        process.exit(0);
    }

    console.log(`Ejecutando en el puerto: ${PORT}`);
    const mongoose = require('mongoose');

    const mongoURL = entorno === constants.ENVIRONMENTS.local ? 
                     (`${config.mongo.dev.host}/${config.mongo.dev.defaultDB}`) :
                     (`${config.mongo.production.host}/${config.mongo.production.defaultDB}`)
    mongoose.connect(mongoURL).then(() => {
        console.log('Connected: ' + mongoURL);
    });
});