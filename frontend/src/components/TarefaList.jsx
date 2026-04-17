export default function TarefaList({ tarefas, updateTarefa, getTarefa }) {
  if (!tarefas) {
    return (
      <div className="glass-card max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-[#23213b] border border-white/30 min-h-[400px] flex flex-col justify-center">
        <span className="emoji text-4xl block mb-8">✦</span>
        <p className="text-lg text-white/80 font-medium text-center">Faça login para ver suas tarefas.</p>
      </div>
    );
  }
  if (tarefas.length === 0) {
    return (
      <div className="glass-card max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-[#23213b] border border-white/30 min-h-[400px] flex flex-col justify-center">
        <span className="emoji text-4xl block mb-8 opacity-75">✦</span>
        <p className="text-lg text-white/80 font-medium text-center">Nenhuma tarefa ainda.<br />Adicione a primeira acima!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto scrollbar-thin text-white" style={{fontFamily: 'Inter, Arial, sans-serif'}}>
      {tarefas.map((tarefa) => (
        <TarefaCard
          key={tarefa.id}
          tarefa={tarefa}
          onToggle={() => updateTarefa(tarefa.id)}
          getTarefa={getTarefa}
        />
      ))}
    </div>
  );
}


import { useState } from "react";
import checkIcon from "../assets/check.svg";
import pendenteIcon from "../assets/pendente.svg";

function TarefaCard({ tarefa, onToggle, getTarefa }) {
  const isDone = tarefa.isComplete;
  const [editando, setEditando] = useState(false);
  const [novoTexto, setNovoTexto] = useState(tarefa.content);
  const [loading, setLoading] = useState(false);

  const salvarEdicao = async () => {
    if (!novoTexto.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_BACKEND}/api/tarefa/${tarefa.id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: novoTexto })
      });
      setEditando(false);
      getTarefa();
    } catch (e) {
      alert("Erro ao editar tarefa");
    } finally {
      setLoading(false);
    }
  };

  const removerTarefa = async () => {
    if (!window.confirm("Remover esta tarefa?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_BACKEND}/api/tarefa/${tarefa.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      getTarefa();
    } catch (e) {
      alert("Erro ao remover tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`glass-card p-6 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl hover:border-white/40 transition-all duration-300 group active:scale-[0.98] ${isDone ? "bg-green-600/80" : "bg-[#23213b] hover:bg-[#2d2650]"}`}
      style={{}}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
        {/* Botão de concluir tarefa */}

        <button
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all shadow-lg border border-white/30 backdrop-blur-sm focus:outline-none ${isDone ? "bg-green-500/80 hover:bg-green-600 text-white shadow-green-400/20" : "bg-white/10 hover:bg-white/20 text-white/70 shadow-md"}`}
          onClick={onToggle}
          aria-label={isDone ? "Tarefa concluída" : "Concluir tarefa"}
          disabled={loading}
        >
          {isDone ? (
            <img src={checkIcon} alt="Concluída" className="w-7 h-7" />
          ) : (
            <img src={pendenteIcon} alt="Pendente" className="w-7 h-7" />
          )}
        </button>

        {/* Conteúdo ou edição */}
        <div className="flex-1 min-w-0">
          {editando ? (
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full">
              <input
                className="rounded-lg px-2 py-1 bg-white/90 text-black w-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                style={{fontFamily: 'Inter, Arial, sans-serif'}}
                value={novoTexto}
                onChange={e => setNovoTexto(e.target.value)}
                disabled={loading}
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') salvarEdicao();
                  if (e.key === 'Escape') setEditando(false);
                }}
              />
              <button className="px-2 py-1 rounded bg-green-600 text-white font-bold hover:bg-green-700" onClick={salvarEdicao} disabled={loading}>Salvar</button>
              <button className="px-2 py-1 rounded bg-gray-400 text-white font-bold hover:bg-gray-500" onClick={() => setEditando(false)} disabled={loading}>Cancelar</button>
            </div>
          ) : (
            <span className={`block font-medium text-base sm:text-lg transition-colors pr-0 sm:pr-4 text-white break-words ${isDone ? "line-through opacity-80" : ""}`} style={{fontFamily: 'Inter, Arial, sans-serif', wordBreak: 'break-word'}}>
              {tarefa.content}
            </span>
          )}
        </div>

        {/* Botões de ação */}
        {!editando && (
          <div className="flex gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
            <button
              className="flex-1 sm:flex-none px-3 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
              onClick={() => setEditando(true)}
              disabled={loading}
              title="Editar tarefa"
            >
              Editar
            </button>
            <button
              className="flex-1 sm:flex-none px-3 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
              onClick={removerTarefa}
              disabled={loading}
              title="Remover tarefa"
            >
              Remover
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
