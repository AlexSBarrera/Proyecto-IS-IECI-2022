const express = require('express');
const api = express.Router();
const reghocontroller = require('../controllers/reghoracontroller');

api.post('/reghora/create', reghocontroller.createRegHora);
api.get('/reghora/get', reghocontroller.getRegHora);
api.get('/reghora/search/:id', reghocontroller.getSpecificRegHora);
api.put('/reghora/update/:id', reghocontroller.updateRegHora);
api.delete('/reghora/delete/:id', reghocontroller.deleteRegHora);

module.exports = api;