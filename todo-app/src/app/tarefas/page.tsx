"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import { ModalTarefa } from "@/componentes/ModalTarefa";

interface TarefaProps {
  titulo: string;
  concluido: boolean;
  onToggle: () => void;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido, onToggle }) => {
  const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
    concluido
      ? "bg-gray-800 hover:border-gray-800 text-white"
      : "bg-gray-400 hover:border-gray-400"
  }`;

  return (
    <div className={classeCard} onClick={onToggle}>
      <h3 className="text-xl font-bold">{titulo}</h3>
      <p className="text-sm">{concluido ? "Concluída" : "Pendente"}</p>
    </div>
  );
};

interface TarefasProps {
  dados: TarefaInterface[];
  onToggleTarefa: (id: number) => void;
}

const Tarefas: React.FC<TarefasProps> = ({ dados, onToggleTarefa }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dados.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          titulo={tarefa.title}
          concluido={tarefa.completed}
          onToggle={() => onToggleTarefa(tarefa.id)}
        />
      ))}
    </div>
  );
};

const TarefasPage = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados); // Inicia com os dados locais
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false); // Não mostra loading inicial pois já temos dados locais
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/todos');
        // Combina os dados locais com os da API, mantendo os títulos locais quando os IDs coincidem
        const tarefasCombinadas = tarefas.map(tarefaLocal => {
          const tarefaAPI = response.data.todos.find((t: TarefaInterface) => t.id === tarefaLocal.id);
          return tarefaAPI ? { ...tarefaAPI, title: tarefaLocal.title } : tarefaLocal;
        });
        // Adiciona as tarefas da API que não existem localmente
        const novasTarefas = response.data.todos.filter((t: TarefaInterface) => 
          !tarefas.some(tl => tl.id === t.id)
        );
        setTarefas([...tarefasCombinadas, ...novasTarefas]);
      } catch (err) {
        setError('Erro ao carregar tarefas da API (usando dados locais)');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []);

  const handleAdicionarTarefa = (titulo: string) => {
    const novaTarefa: TarefaInterface = {
      id: Math.max(0, ...tarefas.map(t => t.id)) + 1,
      title: titulo,
      completed: false,
    };
    setTarefas([...tarefas, novaTarefa]);
    setMostrarModal(false);
  };

  const handleToggleTarefa = (id: number) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Atualizando tarefas...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />
      
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <button
        onClick={() => setMostrarModal(true)}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Adicionar Tarefa
      </button>
      
      <Tarefas 
        dados={tarefas} 
        onToggleTarefa={handleToggleTarefa} 
      />
      
      {mostrarModal && (
        <ModalTarefa
          onAdicionarTarefa={handleAdicionarTarefa}
          onFechar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
};

export default TarefasPage;