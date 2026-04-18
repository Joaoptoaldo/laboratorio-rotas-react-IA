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
    <div>
      <div className="mb-4 text-white/80 text-base font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6" /></svg>
        Clique no ícone para concluir uma tarefa
      </div>
      <div className="space-y-4 text-white" style={{fontFamily: 'Inter, Arial, sans-serif'}}>
        {tarefas.map((tarefa) => (
          <TarefaCard
            key={tarefa.id}
            tarefa={tarefa}
            onToggle={() => updateTarefa(tarefa.id)}
            getTarefa={getTarefa}
          />
        ))}
      </div>
    </div>
  );
}


import { useRef, useState } from "react";
import checkIcon from "../assets/check.svg";
import pendenteIcon from "../assets/pendente.svg";

function TarefaCard({ tarefa, onToggle, getTarefa }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef(null);
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
      className={`glass-card p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-lg border border-white/20 bg-gradient-to-br from-[#23213b] via-[#23213b]/90 to-[#2d2650] transition-all duration-200 group active:scale-[0.98] ${isDone ? "bg-green-500/30" : ""}`}
      style={{}}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
        {/* Botão de concluir tarefa */}

        <div className="relative inline-block">
          <button
            ref={iconRef}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl transition-all shadow-lg border border-white/30 focus:outline-none ${isDone ? "bg-green-500/80 hover:bg-green-600 text-white shadow-green-400/20" : "bg-white/10 hover:bg-white/20 text-white/70 shadow-md"}`}
            style={{touchAction: 'manipulation'}}
            onClick={onToggle}
            aria-label={isDone ? "Tarefa concluída" : "Concluir tarefa"}
            disabled={loading}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            {isDone ? (
              <img src={checkIcon} alt="Concluída" className="w-7 h-7" />
            ) : (
              <img src={pendenteIcon} alt="Pendente" className="w-7 h-7" />
            )}
          </button>
          {!isDone && showTooltip && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 rounded-lg bg-black/90 text-white text-xs font-semibold shadow-lg z-50 whitespace-nowrap animate-fade-in">
              Concluir tarefa
            </div>
          )}
        </div>

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
            <span className={`block font-semibold text-xl sm:text-2xl transition-colors pr-0 sm:pr-4 text-white break-words ${isDone ? "line-through opacity-80" : ""}`} style={{fontFamily: 'Inter, Arial, sans-serif', wordBreak: 'break-word'}}>
              {tarefa.content}
            </span>
          )}
        </div>

        {/* Botões de ação */}
        {!editando && (
          <div className="flex gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
            <button
              className="flex-1 sm:flex-none px-2 py-1 sm:px-4 sm:py-2 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2 shadow-md hover:bg-blue-700 hover:shadow-lg transition text-sm sm:text-base"
              onClick={() => setEditando(true)}
              disabled={loading}
              title="Editar tarefa"
              aria-label="Editar tarefa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-2.414a2 2 0 01.586-1.414z" /></svg>
              Editar
            </button>
            <button
              className="flex-1 sm:flex-none px-2 py-1 sm:px-4 sm:py-2 rounded-2xl bg-red-600 text-white font-bold flex items-center gap-2 shadow-md hover:bg-red-700 hover:shadow-lg transition text-sm sm:text-base"
              onClick={removerTarefa}
              disabled={loading}
              title="Remover tarefa"
              aria-label="Remover tarefa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Remover
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
