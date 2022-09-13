const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
usuario: String,
data: String,
tarefa: String,
situacao: { type: String, default: "NC" },

}, {
    timestamps: true
});

const task = mongoose.model('Task', DataSchema);
module.exports = task;