const express = require('express');
const api = express.Router();
const helper = require('../controllers/helper');

api.put('/helper/reserve/:id/:uid', helper.reserveHorario);
api.put('/helper/cancel/:id/:uid', helper.cancelHorario);

module.exports = api;