const mongoose = require('mongoose');

module.exports = mongoose.model('Escuela', new mongoose.Schema({
    nombre: String,
    clave: String,
    registro: String,
    estudiantes: Array,
    colaboradores: Array,
    carreras: Object
}), 'Escuelas');