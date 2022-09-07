const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

module.exports = {
    async createUser(req, res) {
        const { usuario, email, metodo, senha } = req.body;
        let dados = {};
        let existe = await User.findOne({ $or: [{ usuario: usuario }, { email: email }] });
        if (!existe) {
            let senhaE = await bcrypt.hashSync(senha, 12);
            dados = { usuario, email, metodo, senha: senhaE };
            user = await User.create(dados);
            res.status(201).json(user);
        } else {
            res.status(500).json({ msg: "Usuário já existe" })
        }
    },

    async loginUser(req, res) {
        const { usuario, email, senha } = await req.body;
        let user = await User.findOne({ $or: [{ usuario: usuario }, { email: email }] });
        if (user) {
            const coincide = await bcrypt.compare(senha, user.senha);
            if (coincide) {
                let token = null;
                try {
                    token = jwt.sign({
                        usuario: user.usuario,
                        email: user.email,
                        metodo: user.metodo,
                        _id: user._id,
                    },
                        process.env.SECRET,
                    );

                    console.log("Autenticação realizada com sucesso");
                } catch (error) {
                    console.log(`Ocorreu um erro ${error}`);
                }
                res.status(202).json({ token: token });
            } else {
                res.status(404).json({ msg: "Usuário não encontrado" });
            }

        }
    }
}
