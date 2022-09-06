const express = require('express');

const router = require('./routes');

const bodyParser = require('body-parser')

require('dotenv').config();

const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

require('./db')

app.listen(process.env.PORT || process.env.SERVER_PORT, () => {
    try {
        console.log("Servidor está on");
    } catch (e) {
        console.log("Servidor está off: \n" + e);
    }
});