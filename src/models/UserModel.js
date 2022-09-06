const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
usuario: String,
email: String,
metodo: String,
senha: String
}, {
    timestamps: true
});

const user = mongoose.model('User', DataSchema);
module.exports = user;