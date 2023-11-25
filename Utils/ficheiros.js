// CAMINHO_DO_ARQUIVO: /c:/Users/ruimarodrigues/Desktop/DWDM/1ºAno/1ºSem/VSCode/Exercicios/TDW/Node/Aula02/Utils/ficheiros.js
const fs = require('fs');

function salvarNoArquivo(caminhoArquivo, dados) {
    fs.writeFile(caminhoArquivo, JSON.stringify(dados), (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
        } else {
              console.log('Arquivo salvo com sucesso!');
        }
    });
}

function lerDoArquivo(caminhoArquivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(caminhoArquivo, (err, dados) => {
            if (err) {
                reject(err);
            } else {
                let obj = JSON.parse(dados.toString());
                resolve(obj);
            }
        }
    )}
)}

module.exports = {
    salvarNoArquivo,
    lerDoArquivo
};