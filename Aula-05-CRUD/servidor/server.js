const express = require("express");
const app = express('express');
const cors = require("cors");
const mysql = require("mysql2");

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: 3307,
  database: "crudealunos"
};

let db;

function iniciarBancoDeDados() {
  const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port
  });

  connection.query("CREATE DATABASE IF NOT EXISTS crudealunos", (databaseError) => {
    if (databaseError) {
      console.error("Erro ao criar o banco de dados:", databaseError);
      process.exit(1);
    }

    connection.end();

    db = mysql.createPool(dbConfig);

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS alunos (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        idade VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )
    `;

    db.query(createTableSQL, (tableError) => {
      if (tableError) {
        console.error("Erro ao criar a tabela alunos:", tableError);
        process.exit(1);
      }

      app.listen(3001, () => {
        console.log("rodando servidor");
      });
    });
  });
}

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
  const sql = "SELECT * FROM alunos";
  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar alunos" });
      return;
    }

    res.json(result);
  });
});

app.delete("/excluir/:id", (req, res) => {
    const alunoId = req.params.id;
  const sql = "DELETE FROM alunos WHERE id = ?";
  db.query(sql, [alunoId], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir aluno" });
      return;
    }

    res.json({ message: "Aluno excluído com sucesso" });
  });
});

//app.use(cors());


app.post("/register", (req, res) => { //não tinha o req
    const { nome, idade } = req.body;
  const sql = "INSERT INTO alunos(nome, idade) VALUES (?, ?)";
  db.query(sql, [nome, idade], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar aluno" });
      return;
    }

    res.json({ message: "Aluno cadastrado com sucesso", id: result.insertId });
  });
});

app.put("/editar/:id", (req, res) => {
    const alunoId = req.params.id;
    const { nome, idade } = req.body;
  const sql = "UPDATE alunos SET nome = ?, idade = ? WHERE id = ?";
  db.query(sql, [nome, idade, alunoId], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao editar aluno" });
      return;
    }

    res.json({ message: "Aluno editado com sucesso" });
  });
  });  

iniciarBancoDeDados();
