const express = require('express');
const api = express.Router();
const horariocontroller = require('../controllers/horariocontroller');

api.post('/horario/create', horariocontroller.createHorario);
api.get('/horario/get', horariocontroller.getHorario);
api.get('/horario/search/:id', horariocontroller.getSpecificHorario);
api.put('/horario/update/:id', horariocontroller.updateHorario);
api.delete('/horario/delete/:id', horariocontroller.deleteHorario);

module.exports = api;