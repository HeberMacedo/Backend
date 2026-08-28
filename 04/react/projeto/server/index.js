const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Bem vindo!!! Servidor está ok.")
})

app.listen(3001, () => {
    console.log("Servidor rodando.");
});