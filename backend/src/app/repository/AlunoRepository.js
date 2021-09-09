const db = require('../../database');

class AlunoRepository
{
    registerAluno(alunoData)
    {
        const query = 'INSERT INTO alunos SET ?';
        return new Promise((resolve, reject) =>
        {
            db.query(query, alunoData, (erro, resultado) =>
            {
                if (erro) {
                    return reject(erro);
                }
                return resolve(resultado);
            });
        });
    }

    listAlunos()
    {
        const query = 'SELECT * FROM alunos';
        return new Promise((resolve, reject) =>
        {
            db.query(query, (erro, resultado) =>
            {
                if (erro) {
                    return reject(erro);
                }
                return resolve(resultado);
            });
        });
    }
    deleteAluno()
    {

    }
    updateAluno()
    {

    }

    listByPersonalId(id)
    {
        const query = 'SELECT * FROM alunos WHERE id_personal = ?';
        return new Promise((resolve, reject) =>
        {
            db.query(query, id, (erro, resultado) =>
            {
                if (erro) {
                    return reject(erro);
                }
                return resolve(resultado);
            });
        });

    }
}

module.exports = new AlunoRepository();