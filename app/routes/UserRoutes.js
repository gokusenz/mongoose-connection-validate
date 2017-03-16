const express = require('express');
const UserController = require('../controllers/UserController');
const LoginValidate = require('../requests/LoginValidate');

const router = express.Router();

router.post('/login', LoginValidate, UserController.login);

module.exports = router;
