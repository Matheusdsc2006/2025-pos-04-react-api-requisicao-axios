// @/components/ModalTarefa.tsx
import { useState } from 'react';

interface ModalTarefaProps {
  onAdicionarTarefa: (titulo: string) => void;
  onFechar: () => void;
}

export const ModalTarefa = ({ onAdicionarTarefa, onFechar }: ModalTarefaProps) => {
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaTarefa.trim()) {
      onAdicionarTarefa(novaTarefa);
      setNovaTarefa('');
      onFechar();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Adicionar Nova Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Digite o título da tarefa"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};