// @/components/Tarefa.tsx
import { useState } from 'react';

interface TarefaProps {
  titulo: string;
  concluido: boolean;
  onToggle: () => void;
}

export const Tarefa = ({ titulo, concluido, onToggle }: TarefaProps) => {
  const [estaConcluido, setEstaConcluido] = useState(concluido);

  const escutarClique = () => {
    const novoEstado = !estaConcluido;
    setEstaConcluido(novoEstado);
    onToggle();
  };

  const classe = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
    estaConcluido
      ? "bg-gray-800 hover:border-gray-800 text-white"
      : "bg-gray-400 hover:border-gray-400"
  }`;

  return (
    <div className={classe} onClick={escutarClique}>
      <h3 className="text-xl font-bold">{titulo}</h3>
      <p className="text-sm">{estaConcluido ? "Concluída" : "Pendente"}</p>
    </div>
  );
};