const { Router } = require('express');

const PersonalRepository = require('./app/repositories/PersonalRepository');

const router = Router();

router.get('/personais', (req, res) => { PersonalRepository.findAll(res); });
router.post('/personais', (req, res) => { PersonalRepository.createPersonal(req, res); });

module.exports = router;
