const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const PersonalController = require('./app/controllers/PersonalController');
const AlunoController = require('./app/controllers/AlunoController');
const LancamentoController = require('./app/controllers/LancamentoController');
const BotController = require('./app/controllers/BotController');

const router = Router();

// Login
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Personal
router.post('/personal', AuthController.validaAcess, PersonalController.registerPersonal);
router.get('/personal', AuthController.validaAcess, PersonalController.listPersonais);
router.get('/personal/:id', AuthController.validaAcess, PersonalController.listPersonalById);
router.get('/resumo', AuthController.validaAcess, PersonalController.dadosDoPersonalResumido);
router.get('/faturamento/:id', AuthController.validaAcess, PersonalController.filtroMesFinanceiroPersonal);

// Aluno
router.get('/alunos/:id', AuthController.validaAcess, AlunoController.listByPersonalId);
router.get('/alunos/aluno/:id', AuthController.validaAcess, AlunoController.listByAlunoId);
router.get('/alunos', AuthController.validaAcess, AlunoController.listAlunos);
router.put('/alunos', AuthController.validaAcess, AlunoController.updateAlunos);
router.post('/alunos', AuthController.validaAcess, AlunoController.registerAluno);
router.delete('/alunos/:id', AuthController.validaAcess, AlunoController.deleteAluno);
router.get('/tabela', AuthController.validaAcess, AlunoController.listAlunosTabela);
router.get('/mes/:id', AuthController.validaAcess, AlunoController.filtroPorMesAlunos);
router.get('/cobranca/:dia', AuthController.validaAcess, AlunoController.autorizarCobranca);
router.get('/atrasados', AuthController.validaAcess, AlunoController.telefonesAlunosByPagamento);
router.get('/comprovantes', AuthController.validaAcess, AlunoController.comprovantes);

// Lançamentos
router.post('/lancamento/aula', AuthController.validaAcess, LancamentoController.lancaAula);
router.post('/lancamento/pagamento', AuthController.validaAcess, LancamentoController.lancaPagamento);
router.post('/lancamento/extra', AuthController.validaAcess, LancamentoController.lancaRendaExtra);

// TODOS
router.get('/todos/personal', AuthController.validaAcess, PersonalController.PersonalTodos);
router.get('/todos/alunos', AuthController.validaAcess, AlunoController.alunoTodos);

// BOT
router.get('/bot/:phone', BotController.getPersonalDataByPhone);

module.exports = router;
