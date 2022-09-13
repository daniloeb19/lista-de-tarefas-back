const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado" })
    }
    try {
        jwt.verify(token, process.env.SECRET, (error, decode) => {
            if (error) {
                return res.status(400).json({ msg: "Token Inválido" })
            } else {
                req._id = decode._id;
                req.usuario = decode.usuario;
                req.email = decode.email;
                req.metodo = decode.metodo;
                next();
            }
        });
    } catch (error) {
        return res.status(400).json({ msg: "Token Inválido" })
    }
}
module.exports = checkToken;