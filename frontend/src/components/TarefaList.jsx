export default function TarefaList({ tarefas, updateTarefa }) {
  if (!tarefas) {
    return (
      <div className="glass-card max-w-md mx-auto p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 min-h-[400px] flex flex-col justify-center">
        <span className="emoji text-4xl block mb-8">✦</span>
        <p className="text-lg text-white/80 font-medium text-center">Faça login para ver suas tarefas.</p>
      </div>
    );
  }
  if (tarefas.length === 0) {
    return (
      <div className="glass-card max-w-md mx-auto p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 min-h-[400px] flex flex-col justify-center">
        <span className="emoji text-4xl block mb-8 opacity-75">✦</span>
        <p className="text-lg text-white/80 font-medium text-center">Nenhuma tarefa ainda.<br />Adicione a primeira acima!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto scrollbar-thin">
      {tarefas.map((tarefa) => (
        <TarefaCard
          key={tarefa.id}
          tarefa={tarefa}
          onToggle={() => updateTarefa(tarefa.id)}
        />
      ))}
    </div>
  );
}

function TarefaCard({ tarefa, onToggle }) {
  const isDone = tarefa.isComplete;

  return (
    <div className="glass-card p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/30 hover:shadow-2xl hover:border-white/40 hover:backdrop-blur-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group active:scale-[0.98]" onClick={onToggle}>
      <div className="flex items-center gap-4">
        {/* Checkbox neutro */}
        <button className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all shadow-lg border border-white/30 backdrop-blur-sm ${isDone ? "bg-white/30 hover:bg-white/40 text-white shadow-white/20" : "bg-white/10 hover:bg-white/20 text-white/70 shadow-md"}`}>
          {isDone ? "✓" : "-"}
        </button>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <span className={`block font-medium text-lg transition-colors pr-4 ${isDone ? "line-through text-white/60" : "text-white hover:text-white/90"}`}>
            {tarefa.content}
          </span>
        </div>

        {/* Status badge neutro */}
        <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all backdrop-blur-sm border border-white/30 text-white/90 ${isDone ? "bg-white/20 hover:bg-white/30" : "bg-white/15 hover:bg-white/25"}`}>
          {isDone ? "✓" : "○"}
        </span>
      </div>
    </div>
  );
}
