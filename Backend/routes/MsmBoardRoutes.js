const express = require('express');
const api = express.Router();
const MsmBoardController = require('../controllers/MsmBoardController');

api.post('/MsmBoard/create', MsmBoardController.createMsmBoard);
api.get('/MsmBoard/get', MsmBoardController.getMsmBoard);
api.put('/MsmBoard/update/:id', MsmBoardController.updateMsmBoard);
api.delete('/MsmBoard/delete/:id', MsmBoardController.deleteMsmBoard);

module.exports = api;