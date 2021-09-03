const { Router } = require('express');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/register', UserController.registerUser);
router.get('/login', UserController.loginUser);


module.exports = router;