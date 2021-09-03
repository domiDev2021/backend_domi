const { response } = require('express');
const UserRepository = require('../repository/UserRepository');

class UserController
{
    registerUser(request, response)
    {
        response.send('Ola mundo');

    }

    loginUser(request, response)
    {
        response.send('Ola mundo login');
    }
}

module.exports = new UserController();