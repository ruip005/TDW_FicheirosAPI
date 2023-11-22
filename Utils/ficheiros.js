// CAMINHO_DO_ARQUIVO: /c:/Users/ruimarodrigues/Desktop/DWDM/1ºAno/1ºSem/VSCode/Exercicios/TDW/Node/Aula02/Utils/ficheiros.js
const fs = require('fs');

/*
function salvarNoArquivo(caminhoArquivo, dados) {
    fs.writeFile(caminhoArquivo, dados, (err) => {
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
                let obj = JSON.parse(dados);
                resolve(obj)
            }
        }
    )}
)}*/

function salvarNoArquivo(caminho, data) {
    //fs.readFile('data.txt', 'utf8', function (err, contents) {
    fs.writeFile(caminho, JSON.stringify(data), (err) => { 
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
        } else {
            console.log('Arquivo salvo com sucesso!');
        }
    })
}

function lerDoArquivo(caminho) {
    return new Promise(function (resolve, reject) {
        fs.readFile(caminho, 'utf8', function (err, data) { 
        if (err) reject(err);
        if (data == "" || data == null) {
            resolve([]); return;
        }
        console.log("A ler...")
        obj = JSON.parse(data);
        resolve(obj);
        });
    });
}

module.exports = {
    salvarNoArquivo,
    lerDoArquivo
}