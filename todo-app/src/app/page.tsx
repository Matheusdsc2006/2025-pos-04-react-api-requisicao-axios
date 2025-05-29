"use client";

import { useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import { ModalTarefa } from "@/componentes/ModalTarefa";
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Cabecalho />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Gerenciador de Tarefas</h1>
          <p className="text-xl text-gray-600 mb-6">Organize suas tarefas de forma simples e eficiente</p>
          <div className="flex justify-center gap-4">
            
            <Link 
              href="/tarefas/" 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              Ver Todas as Tarefas
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Suas Tarefas Recentes</h2>
          {tarefas.length > 0 ? (
            <Tarefas 
              dados={tarefas.slice(0, 4)} 
              onToggleTarefa={handleToggleTarefa} 
            />
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">Nenhuma tarefa cadastrada ainda</p>
            </div>
          )}
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Como usar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-medium mb-2">1. Adicione tarefas</h3>
              <p className="text-gray-600">Clique no botão acima para criar novas tarefas</p>
            </div>
            <div className="p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-medium mb-2">2. Marque como concluído</h3>
              <p className="text-gray-600">Clique em uma tarefa para alternar seu status</p>
            </div>
            <div className="p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-medium mb-2">3. Visualize todas</h3>
              <p className="text-gray-600">Acesse a página completa de tarefas</p>
            </div>
          </div>
        </section>
      </main>
      
      {mostrarModal && (
        <ModalTarefa
          onAdicionarTarefa={handleAdicionarTarefa}
          onFechar={() => setMostrarModal(false)}
        />
      )}
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Gerenciador de Tarefas - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;