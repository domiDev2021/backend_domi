const db = require('../../database/index');

class UserRepository
{
    registerUser(userData)
    {
        const query = "INSERT INTO users SET ?";
        return new Promise((resolve, reject) =>
        {
            db.query(query, userData, (erro, resultado) =>
            {
                if (erro) {
                    return reject(erro);
                }
                return resolve(resultado);
            });
        });

    }

    findByEmail(email)
    {
        const query = 'SELECT userId, userEmail FROM users WHERE userEmail = ?';

        return new Promise((resolve, reject) =>
        {
            db.query(query, email, (erro, resultado) =>
            {
                if (erro) {

                    return reject(erro);
                }
                return resolve([resultado, true]);
            });
        });

    }

    loginUser(email)
    {
        const query = 'SELECT * FROM users WHERE userEmail = ?';

        return new Promise((resolve, reject) =>
        {
            db.query(query, email, (erro, resultado) =>
            {
                if (erro) {
                    return reject(erro);
                }
                return resolve(resultado);
            });
        });
    }
}

module.exports = new UserRepository();