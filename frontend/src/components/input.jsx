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
        className="flex-1 min-w-0 p-3 sm:p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 focus:outline-none focus:placeholder-white/40 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-medium"
        type="text"
        placeholder="Digite uma tarefa..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Digite uma tarefa"
      />
      <button 
        className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:from-emerald-500 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap text-base mt-2 sm:mt-0 border-2 border-emerald-400"
        onClick={handleAdd} 
        disabled={loading || !content.trim()}
        aria-label="Adicionar tarefa"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mr-1 text-emerald-300 drop-shadow" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#059669"/><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        {loading ? "..." : "Adicionar"}
      </button>
    </div>
  );
}
