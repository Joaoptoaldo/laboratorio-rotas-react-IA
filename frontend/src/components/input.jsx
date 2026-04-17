import { useState } from "react";

const backend = import.meta.env.VITE_BACKEND;

export default function Input({ getTarefa }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backend}/api/tarefa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Erro ao criar tarefa");
      setContent("");
      getTarefa();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="glass-card p-5 rounded-3xl shadow-xl border border-white/20 group hover:shadow-2xl transition-all duration-300 w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4" style={{fontFamily: 'Inter, Arial, sans-serif'}}>
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <span className="emoji text-xl text-blue-400/80 group-hover:text-blue-400 transition-colors">◇</span>
      </div>
      <input
        className="flex-1 min-w-0 p-3 sm:p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 focus:outline-none focus:placeholder-white/30 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg"
        type="text"
        placeholder="Digite uma nova tarefa e pressione Enter..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{fontFamily: 'Inter, Arial, sans-serif'}}
      />
      <button 
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold shadow-lg hover:from-emerald-600 hover:to-blue-700 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap text-sm mt-2 sm:mt-0"
        onClick={handleAdd} 
        disabled={loading || !content.trim()}
        style={{fontFamily: 'Inter, Arial, sans-serif'}}
      >
        {loading ? "..." : "Adicionar"}
      </button>
    </div>
  );
}
