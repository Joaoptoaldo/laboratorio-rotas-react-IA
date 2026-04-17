import { useEffect, useState } from "react";

import './App.css';
import Auth from "./Auth";
import Input from "./components/input";
import TarefaList from "./components/TarefaList";
// import ThemeToggle from "./components/ui/ThemeToggle";

const backend = import.meta.env.VITE_BACKEND;


function App() {
  const [tarefas, setTarefas] = useState([]);
  const [autenticado, setAutenticado] = useState(() => !!localStorage.getItem("token"));

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
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm text-white bg-[radial-gradient(circle_at_top,_#3b0764,_#1e293b_70%,_#020617_100%)] font-sans"
      style={{fontFamily: 'Inter, Arial, Helvetica, sans-serif'}}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center">
              <img src="/src/assets/logo.svg" className="w-8 h-8" alt="Logo" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black drop-shadow-2xl [text-shadow:0_4px_8px_rgba(0,0,0,0.7)] text-white font-sans">
                Tarefas
              </h1>
              <p className="text-sm mt-1 text-white/90 font-sans">
                Gerencie suas tarefas diárias
              </p>
            </div>
          </div>
          {/* <ThemeToggle /> */}
          <button className="logout-btn text-white font-bold hover:text-yellow-300 transition-colors duration-200 font-sans" onClick={handleLogout}>Sair</button>
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