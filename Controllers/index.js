const fs = require('fs');
const ficheiros = require("../Utils/ficheiros");

module.exports = function (app) {
    app.get('/', (req, res) => {
        let dados = ficheiros.lerDoArquivo('./arquivo.json');
        dados.then((arquivo) => {
            res.send(arquivo);
        }).catch((err) => {
            res.status(500).send('Erro ao ler arquivo: ' + err);
        });
    });

    app.post('/', (req, res) => {
        const content = req.body;
        ficheiros.salvarNoArquivo('./arquivo.json', content);
        res.send('Arquivo salvo com sucesso!');
    });
}
