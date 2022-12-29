const express = require('express');
const api = express.Router();
const maqcontroller = require('../controllers/maqcontroller');

api.post('/maquina/create', maqcontroller.createMaquina);
api.get('/maquina/get', maqcontroller.getMaquina);
api.get('/maquina/search/:id', maqcontroller.getSpecificMaquina);
api.put('/maquina/update/:id', maqcontroller.updateMaquina);
api.delete('/maquina/delete/:id', maqcontroller.deleteMaquina);

module.exports = api;