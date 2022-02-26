const mongoose = require('mongoose');
const url  = 'mongodb://localhost/Maggenta';
mongoose.Promise = global.Promise; //Que moongo se utilice de manera global

mongoose.connect(url,
{useNewUrlParser: true})
.then(() => console.log("Conectado a la base de datos MongoDB"))
.catch(() => {
    console.error("No se pudo conectar a la base de datos MongoDB");
    process.exit();
});