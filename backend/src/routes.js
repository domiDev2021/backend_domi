const { Router } = require('express');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);


module.exports = router;