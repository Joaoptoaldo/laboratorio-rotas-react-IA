import { useState } from "react";
import githubIcon from '/src/assets/github.svg';

const backend = import.meta.env.VITE_BACKEND;

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!email || !senha) {
        setError("Email e senha são obrigatórios.");
        setLoading(false);
        return;
      }
      const url = `${backend}/api/${isLogin ? "login" : "register"}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao autenticar");
      if (data.token) {
        localStorage.setItem("token", data.token);
        onAuth();
      }
      if (data.message && !data.token) {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3b2177] via-[#1e293b] to-[#0f172a] text-white"
      style={{fontFamily: 'Inter, Arial, sans-serif'}}
    >
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full glass-card p-8 rounded-3xl shadow-xl backdrop-blur-md border border-white/60 bg-black/60 dark:bg-black/70 flex flex-col justify-center hover:shadow-2xl hover:backdrop-blur-xl hover:border-white/80 hover:bg-black/80 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center mb-2">
              <img src="/logo.svg" className="w-8 h-8" alt="Logo" />
            </div>
            <h2 className="text-3xl font-black text-center text-white/90 drop-shadow-lg">
              {isLogin ? "Bem-vindo!" : "Cadastre-se"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/15"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/15"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            <button 
              className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white/90 font-bold shadow-lg hover:bg-white/30 hover:border-white/40 hover:text-white transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              type="submit" disabled={loading}
            >
              {loading ? "..." : isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>
          <button className="mt-6 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white/90 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-200 text-sm font-medium mx-auto block w-full active:scale-[0.98]" onClick={() => setIsLogin(v => !v)}>
            {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
          </button>
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white/80 shadow-lg hover:bg-white/20 transition-all">
              {error}
            </div>
          )}
        </div>
      </div>
      {/* Botão flutuante do GitHub */}
      <a
        href="https://github.com/Joaoptoaldo/laboratorio-rotas-react-IA"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 shadow-lg transition text-white text-sm font-medium backdrop-blur"
        title="Ver código fonte do projeto no GitHub"
        aria-label="Ver código fonte do projeto no GitHub"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
        <span className="hidden sm:inline">Link do projeto</span>
        <span className="sm:hidden">GitHub</span>
      </a>
    </div>
  );
}
