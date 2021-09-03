const { response } = require('express');
const UserRepository = require('../repository/UserRepository');
const bycript = require('bcryptjs');

class UserController
{
    async registerUser(request, response)
    {
        const { userEmail, userPassword } = request.body;
        console.log(userEmail, userPassword);
        const password_crypt = bycript.hashSync(userPassword);
        const result = await UserRepository.registerUser({ userEmail: userEmail, userPassword: password_crypt });
        response.json(result);

    }

    async loginUser(request, response)
    {
        const { userEmail, userPassword } = request.body;
        console.log(userEmail, userPassword);

        const result = await UserRepository.findByEmail(userEmail);
        console.log(result[0].length);
        if (result[0].length === 0) {
            return response.status(400).json('Email or password dont exist');
        }

        if (!result[1]) {
            return response.status(400).json('Email or password dont exist');

        }

        const passwordDb = await UserRepository.loginUser(userEmail);
        console.log(passwordDb[0].userPassword);
        const passwordAndUserMatch = bycript.compareSync(userPassword, passwordDb[0].userPassword);
        if (!passwordAndUserMatch) {
            return response.status(400).json('Email or password incorrect');
        }

        response.json('Usuario logado com sucesso');
    }
}

module.exports = new UserController();