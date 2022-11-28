const express = require('express');
const api = express.Router();
const usercontroller = require('../controllers/usercontroller');
const auth = require('../middlewares/auth');

api.post('/user/create', usercontroller.createUser);
api.get('/user/get', usercontroller.getUser);
api.get('/user/search/:id', usercontroller.getSpecificUser);
api.put('/user/update/:id', auth, usercontroller.updateUser);
api.delete('/user/delete/:id', auth, usercontroller.deleteUser);
api.post('/user/login', usercontroller.signin);
api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: 'Acceso concedido' });
});

module.exports = api;