import { useEffect, useState } from "react";

import './App.css';
import Auth from "./Auth";
import Input from "./components/input";
import TarefaList from "./components/TarefaList";


import githubIcon from '/src/assets/github.svg';

const backend = import.meta.env.VITE_BACKEND;


function App() {
  const [tarefas, setTarefas] = useState([]);
  const [autenticado, setAutenticado] = useState(() => !!localStorage.getItem("token"));
  // Avatar/nome do usuário removido

  const getTarefa = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${backend}/api/tarefa`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
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
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${backend}/api/tarefa/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      getTarefa();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (autenticado) getTarefa();
  }, [autenticado]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAutenticado(false);
    setTarefas([]);
  };

  if (!autenticado) {
    return <Auth onAuth={() => setAutenticado(true)} />;
  }

  return (
    <div
      className="min-h-screen py-6 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3b2177] via-[#1e293b] to-[#0f172a] text-white"
      style={{fontFamily: 'Inter, Arial, sans-serif'}}
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3 w-full">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center">
              <img src="/src/assets/logo.svg" className="w-8 h-8" alt="Logo" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-black drop-shadow-2xl [text-shadow:0_4px_8px_rgba(0,0,0,0.5)] text-white">
                Tarefas
              </h1>
              <p className="text-sm mt-1 text-white/80">
                Gerencie suas tarefas diárias
              </p>
            </div>
          </div>
          {/* btn sair no topo */}
          <div className="flex items-center gap-2 absolute right-2 top-2 sm:static sm:right-auto sm:top-auto z-50">
            <button
              className="logout-btn px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-base sm:text-lg font-bold bg-white/10 hover:bg-white/20 border border-white/30 shadow transition min-w-[70px] sm:min-w-0"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
          {/* espaço extra no mobile pra não sobrepor */}
          <div className="block sm:hidden" style={{height: '2.5rem'}}></div>
        </div>

        <div className="space-y-4">
          <Input getTarefa={getTarefa} />
          <TarefaList tarefas={tarefas} updateTarefa={updateTarefa} getTarefa={getTarefa} />
        </div>
      </div>
      {/* btn flutuante do github*/}
      <a
        href="https://github.com/Joaoptoaldo/laboratorio-rotas-react-IA"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 shadow-lg transition text-white text-sm font-medium backdrop-blur"
        title="Ver código fonte do projeto no GitHub"
        aria-label="Ver código fonte do projeto no GitHub"
        style={{backdropFilter: 'blur(6px)'}}
      >
        <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
        <span className="hidden sm:inline">link do projeto</span>
        <span className="sm:hidden">GitHub</span>
      </a>
    </div>
  );
}

export default App;