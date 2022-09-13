const express = require('express');
const { createTask,returnTask, successTask, deleteTask, updateTask } = require('./controllers/task');
const userController = require('./controllers/user');
const checkToken = require('./middlewares/jwt');
const router = express.Router();
router.get("/", (req, res) => {
    res.status(200).json({ msg: "Servidor Diz: Tudo certo por aqui!" })
});

//user
router.post("/user/create", (req, res) => userController.createUser(req, res));
router.post("/user/login", (req, res) => userController.loginUser(req, res));

//task
router.post("/task/create", checkToken, async (req, res) => {
    const retorno = await createTask({ body: { usuario: req._id, ...req.body } }, res);
    return retorno;
});

router.post("/task/return", checkToken, async (req, res) => {
    const retorno = await returnTask({ body: { usuario: req._id, ...req.body } }, res);
    return retorno;
});

router.post("/task/success", checkToken, async (req, res) => {
    const retorno = await successTask({ body: { usuario: req._id, ...req.body } }, res);
    return retorno;
});

router.post("/task/delete", checkToken, async (req, res) => {
    const retorno = await deleteTask({ body: { usuario: req._id, ...req.body } }, res);
    return retorno;
});

router.post("/task/update", checkToken, async (req, res) => {
    const retorno = await updateTask({ body: { usuario: req._id, ...req.body } }, res);
    return retorno;
});
module.exports = router;