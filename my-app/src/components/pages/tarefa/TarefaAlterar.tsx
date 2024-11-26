import { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import "./TarefaListar.css";

function TarefaAlterar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Carregar as tarefas e as categorias ao inicializar o componente
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Função para carregar as tarefas da API
  function carregarTarefas() {
    axios
    .get<Tarefa[]>("http://localhost:5000/api/tarefas/listar")
    .then((resposta) => {
      setTarefas(resposta.data);
    })
    .catch((erro) => {
      console.error("Erro ao carregar tarefas:", erro);
    });
  }


  // Função para alterar o status da tarefa (sem precisar passar o novo estado)
  function alterarStatus(tarefaId: string) {
    // Enviar apenas o ID da tarefa para a API
    axios
      .patch(`http://localhost:5000/api/tarefa/alterar/${tarefaId}`)
      .then(() => {
        console.log("Status alterado com sucesso!");
        carregarTarefas(); // Recarregar as tarefas após a alteração
      })
      .catch((erro) => {
        console.error("Erro ao alterar o status da tarefa:", erro);
      });
  }


  return (
    <div>
      <h1>Alterar Status das Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Alterar Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>
                <button onClick={() => alterarStatus(tarefa.tarefaId)}>
                  Alterar Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaAlterar;
