const express = require("express");
const app = express('express');
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors");

const db = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    port:3307,
    password:"",
    database:"crudealunos"
})

/*app.get("/",(req, )=>{
    /*let SQL = "INSERT INTO alunos (id,nome, idade) VALUES (null,'Maria','28')";
    db.query(SQL,(err,result)=>{
        console.log(err);
    });

   /*let SQL = "truncate table alunos";
    db.query(SQL,(err,result)=>{
        console.log(err);
    });
}) */
app.use(cors({
      origin: "http://localhost:3000"
    }));
    
app.use(express.json());
app.get("/listar", (req, res) => {
    let SQL = "SELECT * FROM alunos";
    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar alunos" });
        } else {
            res.json(result); // Enviar os dados dos alunos como resposta
        }
    });
});

app.delete("/excluir/:id", (req, res) => {
    const alunoId = req.params.id;
   // Execute uma consulta SQL para excluir o aluno com base no ID
    const SQL = "DELETE FROM alunos WHERE id = ?";
    db.query(SQL, [alunoId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao excluir aluno" });
      } else {
        res.json({ message: "Aluno excluído com sucesso" });
      }
    });
  });

//app.use(cors());


app.post("/register", (req, res) => { //não tinha o req
    const { nome, idade } = req.body;
    let SQL = "INSERT INTO alunos(nome, idade) VALUES (?, ?)";
    
    db.query(SQL, [nome, idade], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao cadastrar aluno" });
        } else {
            // não tinha o envio da resposta
            res.json({ message: "Aluno cadastrado com sucesso", id: result.insertId });
        }
    });
});

app.put("/editar/:id", (req, res) => {
    const alunoId = req.params.id;
    const { nome, idade } = req.body;
    // Execute uma consulta SQL para atualizar os dados do aluno com base no ID
    const SQL = "UPDATE alunos SET nome = ?, idade = ? WHERE id = ?";
    db.query(SQL, [nome, idade, alunoId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao editar aluno" });
      } else {
        res.json({ message: "Aluno editado com sucesso" });
      }
    });
  });  

app.listen(3001,()=>{
    console.log("rodando servidor");
});
