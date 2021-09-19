const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const PersonalController = require('./app/controllers/PersonalController');
const AlunoController = require('./app/controllers/AlunoController');
const LancamentoController = require('./app/controllers/LancamentoController');

const router = Router();

// Login
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Personal
router.post('/personal', PersonalController.registerPersonal);
router.get('/personal', PersonalController.listPersonais);
router.get('/personal/:id', PersonalController.listPersonalById);
router.get('/personal/resumo/:bool', PersonalController.dadosDoPersonalResumido);
router.get('/faturamento/:id', PersonalController.filtroMesFinanceiroPersonal);

// Aluno
router.get('/alunos/:id', AlunoController.listByPersonalId);
router.get('/alunos/aluno/:id', AlunoController.listByAlunoId);
router.get('/alunos', AlunoController.listAlunos);
router.put('/alunos', AlunoController.updateAlunos);
router.get('/alunos/numero/:bool', AlunoController.telefonesAlunosByPagamento);
router.post('/alunos', AlunoController.registerAluno);
router.delete('/alunos/:id', AlunoController.deleteAluno);
router.get('/tabela', AlunoController.listAlunosTabela);
router.get('/mes/:id', AlunoController.filtroPorMesAlunos);
router.get('/cobranca/:dia', AlunoController.autorizarCobranca);

// Lançamentos
router.post('/lancamento/aula', LancamentoController.lancaAula);
router.post('/lancamento/pagamento', LancamentoController.lancaPagamento);
router.post('/lancamento/extra', LancamentoController.lancaRendaExtra);

module.exports = router;
