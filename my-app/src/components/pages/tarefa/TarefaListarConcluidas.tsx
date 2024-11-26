import { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import "./TarefaListar.css";

function TarefaListarConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Carregar as tarefas e as categorias ao inicializar o componente
  useEffect(() => {
    carregarTarefasConcluidas();
    carregarCategorias();
  }, []);

  // Função para carregar as tarefas concluídas da API
  function carregarTarefasConcluidas() {
    fetch("http://localhost:5000/api/tarefa/concluidas")  // Atualize para o endpoint correto que lista as tarefas não concluídas
    .then((resposta) => resposta.json())
    .then((tarefas) => {
      setTarefas(tarefas);
    });
  }

  // Função para carregar as categorias da API
  function carregarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar categorias:", erro);
      });
  }


  return (
    <div>
      <h1>Lista de Tarefas Concluídas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.length > 0 ? (
            tarefas.map((tarefa) => (
              <tr key={tarefa.tarefaId}>
                <td>{tarefa.tarefaId}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhuma tarefa concluída encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaListarConcluidas;
