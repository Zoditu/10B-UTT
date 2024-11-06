const express = require('express');
const constants = require('./app/utils/constants');
const config = require('./config.json');
const app = express();
const expressip = require('express-ip');
app.use(express.json());
app.use(expressip().getIpInfoMiddleware);
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
const Log = require('./app/models/Log');
const Backup = require('./app/models/Backup');
app.use('/escuela', escuelasRouter);
app.use('/logs', async (req, res) => {
    const logs = await Log.find({});
    res.send(logs);
});

app.use('/backups', async (req, res) => {
    const backups = await Backup.find({});
    res.send(backups);
});

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