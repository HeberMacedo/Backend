import React, { useState } from 'react';
import './App.css';
import CadastroAluno from './components/CadastroAluno';
import ListaAlunos from './components/ListaAlunos';

function App() {
  // Estado para controlar se precisa atualizar a lista de alunos
  const [atualizarLista, setAtualizarLista] = useState(false);

  const triggerAtualizacao = () => {
    setAtualizarLista(prev => !prev);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gerenciamento de Alunos</h1>
      
      {/*função de gatilho para o cadastro */}
      <CadastroAluno onCadastroSucesso={triggerAtualizacao} />
      
      <hr className="my-5" />
      
      {/* estado de atualização para a listagem recarregar os dados */}
      <ListaAlunos key={atualizarLista} />
    </div>
  );
}

export default App;