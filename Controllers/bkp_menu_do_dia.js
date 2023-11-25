const fs = require('fs');
const ficheiros = require("../Utils/ficheiros");

module.exports = function (app) {
    app.get('/', (req, res) => {
        if (!fs.existsSync('./ficheiro_menu.txt')) {
            return res.status(404).json({success: false, message: 'Arquivo não encontrado!'});
        }
        let dados = ficheiros.lerDoArquivo('./ficheiro_menu.txt'); // Renomeando a variável local
        dados.then((arquivo) => {
            res.send(arquivo);
        }).catch((err) => {
            res.status(500).send('Erro ao ler arquivo: ' + err);
        });
    });

    app.post('/', (req, res) => {
        const {content} = req.body;
        if (!fs.existsSync('./ficheiro_menu.txt')) {
            ficheiros.salvarNoArquivo('./ficheiro_menu.txt', content);
            return res.status(200).json({success: true, message: 'Arquivo criado com sucesso!'});
        } else res.status(404).json({success: false, message: 'Arquivo já existe!'});
    });

    app.patch('/update', (req, res) => {
        const {content} = req.body;
        if (!fs.existsSync('./ficheiro_menu.txt')) {
            // Reescrever o arquivo
            return res.status(404).json({success: false, message: 'Arquivo não encontrado!'});
        } else ficheiros.salvarNoArquivo('./ficheiro_menu.txt', content);
        res.send('Arquivo atualizado com sucesso!');
    });

    app.delete('/delete', (req, res) => {
        if (fs.existsSync('./ficheiro_menu.txt')) {
            fs.unlinkSync('./ficheiro_menu.txt');
            return res.status(200).json({success: true, message: 'Arquivo deletado com sucesso!'});
        } else return res.status(404).json({success: false, message: 'Arquivo não encontrado!'});
    });
}

verifyArchive = (filePath) => {
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
}
}

/*
function receber(app) {
    app.get('/', (req, res) => {
        let dados = ficheiros.lerDoArquivo('./ficheiro_menu.txt'); // Renomeando a variável local
        dados.then((arquivo) => {
            res.send(arquivo);
        }).catch((err) => {
            res.status(500).send('Erro ao ler arquivo: ' + err);
        });
    });
}

function enviar(app) {
    app.post('/', (req, res) => {
        const {content} = req.body;
        ficheiros.salvarNoArquivo('./ficheiro_menu.txt', content);
        res.send('Arquivo salvo com sucesso!');
    });
}

module.exports = { receber, enviar };

//outro arquivo
const { receber, enviar } = require('./menu_do_dia');

receber(app);
enviar(app);
*/