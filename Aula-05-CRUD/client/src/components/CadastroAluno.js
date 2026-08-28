import React, { useState } from 'react';
import Axios from "axios";

// Defina o componente CadastroAluno.
function CadastroAluno() {
  // Defina os estados iniciais para 'values'.
  const [values, setValues] = useState({ nome: '', idade: '' });

  // Exiba no console os valores do estado 'values'.
  console.log(values);

  // Função para manipular a mudança nos campos de entrada e atualizar o estado 'values'.
  const handleChangeValues = (value) => {
    // Use a função de atualização do estado para garantir que os valores antigos sejam preservados.
    setValues(prevValue => ({
      ...prevValue, // Mantém os valores antigos do objeto.
      [value.target.name]: value.target.value, // Atualiza o campo correspondente com o novo valor.
    }))
  };

  // Função para lidar com o clique no botão de cadastro.
  const handleClickButton = (e) => {
  e.preventDefault(); // Impede o recarregamento padrão da página

  // Faça uma solicitação POST para a URL especificada com os dados do aluno.
  Axios.post("http://localhost:3000/register", {
    nome: values.nome,
    idade: values.idade
  }).then((response) => { //mudar sintaxe para adicionar a resposta com os dados
    console.log("Cadastrado com sucesso:", response.data); // Exiba a resposta da solicitação no console.
  }).catch((error) => {
    console.error("Erro no envio:", error);
  });
};

  // Renderize o formulário de cadastro de aluno.
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
         <div className="bg-primary p-3 mt-3 p-4 bg-primary rounded">
          <h2>Cadastro de Aluno</h2>
          <form onSubmit={handleClickButton}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name='nome'
                onChange={handleChangeValues}
              />
            </div>
            <div className="form-group">
              <label htmlFor="idade">Idade:</label>
              <input
                type="text"
                name='idade'
                className="form-control"
                id="idade"
                onChange={handleChangeValues}
              />
            </div>
            <button type="submit" className="btn btn-danger mt-3">
              Cadastrar
            </button>
          </form>
          </div>    
        </div>
      </div>
      
    </div>
  );
}

// Exporte o componente CadastroAluno para uso em outros lugares.
export default CadastroAluno;