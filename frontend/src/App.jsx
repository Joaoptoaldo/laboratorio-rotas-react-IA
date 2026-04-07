import { useEffect, useState } from "react";
import Input from "./components/input";
import TarefaList from "./components/TarefaList";
import ThemeToggle from "./components/ui/ThemeToggle";
import './App.css';

const backend = import.meta.env.VITE_BACKEND;

function App() {
  const [tarefas, setTarefas] = useState([]);
  const getTarefa = async () => {
    try {
      const res = await fetch(`${backend}/api/tarefa`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setTarefas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTarefa = async (id) => {
    try {
      const res = await fetch(`${backend}/api/tarefa/${id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      console.log(data);
      getTarefa();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTarefa();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900/90 py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg">Tarefas</h1>
              <p className="text-gray-400 text-sm mt-1">Gerencie suas tarefas diárias</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="space-y-6">
          <Input getTarefa={getTarefa} />
          <TarefaList tarefas={tarefas} updateTarefa={updateTarefa} />
        </div>
      </div>
    </div>
  );
}

export default App;
