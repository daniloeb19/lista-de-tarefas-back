const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

module.exports = {
    async createUser(req, res) {
        const { usuario, email, metodo, senha } = req.body;
        let dados = {};
        let existe = await User.findOne({ $or: [{ usuario: usuario }, { email: email }] })
        if (!existe) {
            let senhaE = await bcrypt.hashSync(senha, 12);
            dados = { usuario, email, metodo, senha: senhaE };
            user = await User.create(dados);
            res.status(201).json(user);
        } else {
            res.status(500).json({ msg: "Usuário já existe" })
        }

    }
}