const express = require('express');
const api = express.Router();
const helper = require('../controllers/helper');

api.put('/helper/reserve/:id/:uid', helper.reserveHorario);
api.put('/helper/cancel/:id/:uid', helper.cancelHorario);
api.put('/helper/disable/:id', helper.deshaHorario);
// api.put('/helper/suma/:id', helper.sumaHorario);

module.exports = api;