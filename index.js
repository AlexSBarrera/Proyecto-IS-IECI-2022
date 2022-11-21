const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const tipolavroutes = require("./routes/tipolavroutes");
const lavroutes = require("./routes/lavroutes");
const statushoraroutes = require("./routes/statushoraroutes");
const horarioroutes = require("./routes/horarioroutes");
const userroutes = require("./routes/userroutes");
const helperroutes = require("./routes/helperroutes");
//const socketio = require('socket.io');

app.use(cors())
app.use(express.json());
app.options('*', cors());
app.use('/api', tipolavroutes);
app.use('/api', lavroutes);
app.use('/api', statushoraroutes);
app.use('/api', horarioroutes);
app.use('/api', userroutes);
app.use('/api', helperroutes);

/*
io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');

    socket.on('chat', (message) => {
        io.emit('chat', message);
    });

});
*/


app.listen(process.env.PORT, () => {
    console.log('Server started v2');
    console.log('EL PROYECTO ESTA CORRIENDO EN EL PUERTO ->',process.env.PORT)
});


mongoose.set('useFindAndModify',false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB, (err) => {
    if (err) {
        return console.log('Error al conectar con la base de datos -> ', err)
    }
    return console.log('Conectado a la base de datos')
});

