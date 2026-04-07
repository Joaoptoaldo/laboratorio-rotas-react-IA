import { useState } from "react";

const backend = import.meta.env.VITE_BACKEND;

const Input = ({ getTarefa }) => {
  const [tarefa, setTarefa] = useState("");

  const postTarefa = async () => {
    try {
      const res = await fetch(`${backend}/api/tarefa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: tarefa }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      console.log(data);
      setTarefa("");
      getTarefa();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group">
      <div className="relative">
        <input
          onChange={(e) => setTarefa(e.target.value)}
          value={tarefa}
          type="text"
          placeholder="Digite uma nova tarefa..."
          className="w-full p-6 pl-14 pr-24 text-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl focus:border-blue-400/50 focus:ring-4 focus:ring-blue-500/20 transition-all duration-500 shadow-2xl hover:shadow-3xl peer placeholder:text-gray-400 text-white"
        />
        <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400 peer-focus:text-blue-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.878 6.707l4.243 4.243-5.657 5.657M12.122 17.293l-4.243-4.243 5.657-5.657" />
        </svg>
        <button 
          onClick={postTarefa} 
          disabled={!tarefa.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transform transition-all duration-300 hover:rotate-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
        >
          {tarefa.trim() ? 'Adicionar Tarefa' : 'Digite...'}
        </button>
      </div>
    </div>
  );
};

export default Input;