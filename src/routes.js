const express = require('express');
const userController = require('./controllers/user');
const router = express.Router();
router.get("/", (req, res) => {
    res.status(200).json({ msg: "Servidor Diz: Tudo certo por aqui!" })
});

router.post("/user/create", (req, res) => userController.createUser(req, res));
router.post("/user/login", (req, res) => userController.loginUser(req, res));

module.exports = router;