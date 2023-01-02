const express = require('express');
const api = express.Router();
const MsmController = require('../controllers/MsmController');

api.post('/MsmBoard/post', MsmController.postEmail);
api.post('/MsmBoard/postAviso', MsmController.crearAviso);
api.get('/MsmBoard/getAviso', MsmController.getAvisos);
api.delete('/MsmBoard/delete/:id', MsmController.deleteAviso);
api.put('/MsmBoard/update/:id', MsmController.updateAviso);


module.exports = api;