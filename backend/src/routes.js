const { Router } = require('express');

const router = Router();

router.get('/', (request, response) => {
  response.send('HELLO');
});

module.exports = router;
