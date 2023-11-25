const fs = require('fs');
const ficheiros = require("../Utils/ficheiros");

class Prato {
    constructor(cod, nome, categoria, tipo) {
        this.cod = cod;
        this.nome = nome;
        this.categoria = categoria;
        this.tipo = tipo;
    }
}

module.exports = function (app) {
    app.get('/', (req, res) => {
        if (!fs.existsSync('./ficheiro_menu.txt')) {
            return res.status(404).json({success: false, message: 'Arquivo não encontrado!'});
        }
        let dados = ficheiros.lerDoArquivo('./ficheiro_menu.txt'); // Renomeando a variável local
        dados.then((arquivo) => {
            res.status(200).send(`Código: ${arquivo.cod[0]}\nNome: ${arquivo.nome[1]}\nCategoria: ${arquivo.categoria}\nTipo: ${arquivo.tipo}\n`);
        }).catch((err) => {
            res.status(500).send('Erro ao ler arquivo: ' + err);
        });
    });

    app.post('/', (req, res) => {
        const {cod, nome, categoria, tipo} = req.body;
        if (!cod || !nome || !categoria || !tipo) {
            return res.status(406).json({success: false, message: 'Dados incompletos!'});
        }
        if (!fs.existsSync('./ficheiro_menu.txt')) {
            const prato = new Prato(cod, nome, categoria, tipo);
            ficheiros.salvarNoArquivo('./ficheiro_menu.txt', JSON.stringify(prato));
            return res.status(200).json({success: true, message: 'Arquivo criado com sucesso!'});
        } else res.status(404).json({success: false, message: 'Arquivo já existe!'});
    });

    app.patch('/update', (req, res) => {
        const {cod, nome, categoria, tipo} = req.body;
        if (!cod || !nome || !categoria || !tipo) {
            return res.status(406).json({success: false, message: 'Dados incompletos!'});
        }
        if (!fs.existsSync('./ficheiro_menu.txt')) {
            // Reescrever o arquivo
            return res.status(404).json({success: false, message: 'Arquivo não encontrado!'});
        } else {
            const prato = new Prato(cod, nome, categoria, tipo);
            ficheiros.salvarNoArquivo('./ficheiro_menu.txt', JSON.stringify(prato));
            res.send('Arquivo atualizado com sucesso!');
        }
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
