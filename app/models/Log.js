const mongoose = require('mongoose');

module.exports = mongoose.model('Log', new mongoose.Schema({
    method: String,
    endpoint: String,
    time: Date,
    geoLocation: Object,
    data: Object,
    params: {
        query: Object,
        path: Object
    }
}), 'Logs');