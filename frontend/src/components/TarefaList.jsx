
export default function TarefaList({ tarefas, updateTarefa }) {
  if (!tarefas) {
    return (
      <div className="empty-state">
        <span className="emoji">✦</span>
        <p>Faça login para ver suas tarefas.</p>
      </div>
    );
  }
  if (tarefas.length === 0) {
    return (
      <div className="empty-state">
        <span className="emoji">✦</span>
        <p>Nenhuma tarefa ainda.<br />Adicione a primeira acima!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
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
  // Backend: tarefa.content, tarefa.isComplete
  const isDone = tarefa.isComplete;

  return (
    <div className="task-card" onClick={onToggle}>
      {/* Checkbox */}
      <button className={`task-checkbox ${isDone ? "done" : "pending"}`}>
        {isDone ? "✓" : "○"}
      </button>

      {/* Nome */}
      <span className={`task-name ${isDone ? "done" : ""}`}>
        {tarefa.content}
      </span>

      {/* Badge */}
      {isDone ? (
        <span className="badge badge-done">✓ Completada</span>
      ) : (
        <span className="badge badge-pending">⏳ Pendente</span>
      )}
    </div>
  );
}