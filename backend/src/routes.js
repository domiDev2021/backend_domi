const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const PersonalController = require('./app/controllers/PersonalController');
const AlunoController = require('./app/controllers/AlunoController');

const router = Router();

// Login
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Personal
router.post('/personal', PersonalController.registerPersonal);
router.get('/personal', PersonalController.listPersonais);

// Aluno
router.post('/alunos', AlunoController.registerAluno);
router.get('/alunos/:id', AlunoController.listByPersonalId);
router.get('/alunos', AlunoController.listAlunos);

module.exports = router;
