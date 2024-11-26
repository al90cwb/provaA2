import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TarefaListar.css";


interface TarefaCadastro {      
  titulo: string;      
  descricao: string;     
  categoriaId: string;  
}


function TarefaCadastrar() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(""); 
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar") // Endpoint para listar categorias
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }, []);

  function enviarTarefa(event: any) {
    event.preventDefault();


    const tarefa: TarefaCadastro = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
    };

    console.log(tarefa);

      fetch("http://localhost:5000/api/tarefas/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })
        .then((resposta) => resposta.json())
        .then((produto) => {
          console.log(produto);
        });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={enviarTarefa} id="form-cadastro">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            required
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            name="categoria"
            value={categoriaId} // Garantir que o valor inicial seja 0
            onChange={(event) => setCategoriaId((event.target.value))}
          >
            <option value={0}>Selecione uma categoria</option> {/* Opção padrão com valor 0 */}
            {categorias.map((categoria) => (
              <option value={categoria.categoriaId} key={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;
