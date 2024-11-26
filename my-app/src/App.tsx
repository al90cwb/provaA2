import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TarefaListar from './components/pages/tarefa/TarefaListar';
import TarefaCadastrar from './components/pages/tarefa/TarefaCadastrar';
import TarefaAlterar from './components/pages/tarefa/TarefaAlterar';
import TarefaListarConcluidas from './components/pages/tarefa/TarefaListarConcluidas';
import TarefaListarNaoConcluidas from './components/pages/tarefa/TarefaListarNaoConcluidas';

function App() {
  return (
    <div id="App">
      <TarefaListar />  
      <TarefaCadastrar />
      <TarefaListarConcluidas/>  
      <TarefaListarNaoConcluidas/>  
      <TarefaAlterar/>      
    </div>
  );
}

export default App;
