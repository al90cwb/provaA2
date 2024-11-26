import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import "./TarefaListar.css";
import axios from "axios";
import { Categoria } from "../../../models/Categoria";

function TarefaListarNaoConcluidas() {
  const [tarefasNaoConcluidas, setTarefasNaoConcluidas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    pesquisarTarefasNaoConcluidas();
  }, []); // A dependência de array vazio faz a pesquisa apenas na primeira renderização

  function pesquisarTarefasNaoConcluidas() {
    fetch("http://localhost:5000/api/tarefa/naoconcluidas")  // Atualize para o endpoint correto que lista as tarefas não concluídas
      .then((resposta) => resposta.json())
      .then((tarefas) => {
        setTarefasNaoConcluidas(tarefas);
      });

      
  }


  return (
    <div id="listar_tarefas_nao_concluidas">
      <h1>Lista de Tarefas Não Concluídas</h1>
      <table id="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefasNaoConcluidas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function alterarStatusTarefa(tarefaId: string) {
    fetch(`http://localhost:5000/api/tarefa/alterar/${tarefaId}`, {
      method: "PATCH",
    })
      .then((resposta) => resposta.json())
      .then(() => {
        // Atualiza a lista de tarefas após alterar o status
        pesquisarTarefasNaoConcluidas();
      })
      .catch((erro) => console.error("Erro ao alterar status da tarefa:", erro));
  }
}

export default TarefaListarNaoConcluidas;
