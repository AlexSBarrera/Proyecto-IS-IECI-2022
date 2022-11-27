const express = require('express');
const api = express.Router();
const tipomaqcontroller = require('../controllers/tipomaqcontroller');

api.post('/tipomaquina/create', tipomaqcontroller.createTipoMaquina);
api.get('/tipomaquina/get', tipomaqcontroller.getTipoMaquina);
api.get('/tipomaquina/search/:id', tipomaqcontroller.getSpecificTipoMaquina);
api.put('/tipomaquina/update/:id', tipomaqcontroller.updateTipoMaquina);
api.delete('/tipomaquina/delete/:id', tipomaqcontroller.deleteTipoMaquina);

module.exports = api;
