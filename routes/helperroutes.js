const express = require('express');
const api = express.Router();
const helper = require('../controllers/helper');

api.put('/helper/reserve/:id', helper.reserveHorario);

module.exports = api;