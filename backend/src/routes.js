const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const PersonalController = require('./app/controllers/PersonalController');

const router = Router();

// Login
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Personal
router.post('/personal', PersonalController.registerPersonal);
router.get('/personal', PersonalController.listPersonais);

module.exports = router;
