const TarefaList = ({ tarefas, updateTarefa }) => {
  if (tarefas.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center shadow-2xl">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Nenhuma tarefa</h3>
        <p className="text-gray-400 max-w-md mx-auto">Adicione sua primeira tarefa acima para começar a organizar seu dia!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
      {tarefas.map((t) => (
        <div 
          key={t.id}
          className={`group/tarefa flex items-center gap-4 p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:bg-white/5 ${
            t.isComplete ? 'bg-green-500/10 border-green-400/30' : 'bg-gray-800/50'
          }`}
        >
          <button
            onClick={() => updateTarefa(t.id)}
            className={`p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0 ${
              t.isComplete 
                ? 'bg-green-500 text-white shadow-green-500/25 hover:scale-110 hover:rotate-12' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25 hover:scale-110 hover:rotate-180'
            }`}
            title={t.isComplete ? "Desmarcar" : "Completar"}
          >
            {t.isComplete ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className={`text-lg font-medium transition-all duration-300 pr-12 ${
              t.isComplete 
                ? 'line-through text-gray-400 opacity-75' 
                : 'text-white group-hover/tarefa:text-blue-100'
            }`}>
              {t.content}
            </p>
          </div>
          
          <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
            t.isComplete 
              ? 'bg-green-500/90 text-white shadow-green-500/50' 
              : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-orange-500/50'
          }`}>
            {t.isComplete ? '✅ Completada' : '⏳ Pendente'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TarefaList;