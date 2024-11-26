import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import "./TarefaListar.css";
import axios from "axios";
function TarefaListar(){

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);


  useEffect(() => {
    pesquisarTarefas();
  }, []); 

  function pesquisarTarefas() {
    axios
    .get<Tarefa[]>("http://localhost:5000/api/tarefas/listar")
    .then((resposta) => {
      setTarefas(resposta.data);
    })
    .catch((erro) => {
      console.error("Erro ao carregar tarefas:", erro);
    });
  }


  return (
    <div id="listar_tarefas">

      <h1>Lista de Tarefas</h1>
      <table id="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.categoriaId}</td>
              <td>{tarefa.status}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TarefaListar;