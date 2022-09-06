const mongoose = require('mongoose');
require('dotenv').config();

try {
    mongoose.connect(process.env.BD_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Mongoose está on")
    });

} catch (e) {
    console.log("Mongoose está off\n" + e);
}