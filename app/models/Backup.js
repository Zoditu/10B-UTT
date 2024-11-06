const mongoose = require('mongoose');

module.exports = mongoose.model('Backup', new mongoose.Schema({
    collection: String,
    data: Object 
}), 'Backups');