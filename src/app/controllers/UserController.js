const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/UserRepository');
require('dotenv').config();

class UserController {
  async registerUser(request, response) {
    const { userEmail, userPassword } = request.body;

    const password_crypt = bycript.hashSync(userPassword);
    const result = await UserRepository.registerUser({ userEmail, userPassword: password_crypt });
    response.json(result);
  }

  async loginUser(request, response) {
    const { userEmail, userPassword } = request.body;

    const result = await UserRepository.findByEmail(userEmail);

    if (result[0].length === 0) {
      return response.status(400).json('Email or password dont exist');
    }

    if (!result[1]) {
      return response.status(400).json('Email or password dont exist');
    }

    const passwordDb = await UserRepository.loginUser(userEmail);

    const passwordAndUserMatch = bycript.compareSync(userPassword, passwordDb[0].userPassword);
    if (!passwordAndUserMatch) {
      return response.status(400).json('Email or password incorrect');
    }

    const token = jwt.sign({ _id: passwordDb[0].userId }, process.env.TOKEN_SECRET, {
      expiresIn: '12h',
    });

    response.header('authorization-token', token);
    response.json('Usuario logado com sucesso');
  }
}

module.exports = new UserController();
