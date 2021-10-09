const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
  validaAcess(request, response, next) {
    const token = request.header('authorization-token');

    if (!token) {
      return response.status(401).json('Acess negado');
    }

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
      request.user = userVerified;
      next();
    } catch (error) {
      response.status(401).json('Acesso negado');
    }
  }
}

module.exports = new AuthController();
