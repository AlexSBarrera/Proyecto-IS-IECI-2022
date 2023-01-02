const express = require('express');
const api = express.Router();
const usercontroller = require('../controllers/usercontroller');

api.post('/user/create', usercontroller.createUser);
api.get('/user/get', usercontroller.getUser);
api.get('/user/search/:id', usercontroller.getSpecificUser);
api.put('/user/update/:id', usercontroller.updateUser);
api.delete('/user/delete/:id', usercontroller.deleteUser);

module.exports = api;