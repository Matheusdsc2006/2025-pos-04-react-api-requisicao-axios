"use client";

import { useState } from "react";
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

const Home = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);
  const [mostrarModal, setMostrarModal] = useState(false);

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

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />
      
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

export default Home;