const Task = require('../models/TaskModel');

module.exports = {
    async createTask(req, res) {
        const { usuario, data, tarefa, situacao } = req.body;
        let dados = { usuario, data, tarefa, situacao };
        let task = await Task.create(dados);
        if (task) {
            res.status(201).json(task);
        } else {
            res.status(500).json({ msg: "Usuário já existe" });
        }
    },
    async returnTask(req, res) {
        let { usuario, situacao } = req.body;
        let task = null;
        let situacaoIsNull = (situacao?.toString() !== undefined);
        if (!situacaoIsNull) {
            task = await Task.find({ usuario: usuario });
        } else {
            task = await Task.find({ $and: [{ usuario: usuario }, { situacao: situacao }] })
        }
        if (task) {
            res.status(202).json(task);
        } else {
            res.status(500).json({ msg: "Usuário já existe" });
        }
    }, async successTask(req, res) {
        let { usuario, _id } = req.body;
        let task = await Task.updateOne({ $and: [{ usuario: usuario }, { _id: _id }] }, { situacao: "CC" }, { new: true });
        if (task) {
            res.status(202).json(task);
        } else {
            res.status(500).json({ msg: "Erro ao concluir tarefa" });
        }
    }, async deleteTask(req, res) {
        let { _id } = req.body;
        let task = await Task.findOneAndDelete({ _id: _id });
        if (task) {
            res.status(202).json(task);
        } else {
            res.status(500).json({ msg: "Erro ao deletar tarefa" });
        }
    }, async updateTask(req, res) {
        let { _id, tarefa, data } = req.body;
        let task = await Task.findOneAndUpdate({ _id: _id }, { tarefa: tarefa, data: data }, { new: true });
        if (task) {
            res.status(202).json(task);
        } else {
            res.status(500).json({ msg: "Erro ao editar tarefa" });
        }
    },
}
