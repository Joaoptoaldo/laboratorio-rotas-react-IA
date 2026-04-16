import { useState } from "react";

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
    <div className="auth-wrapper">
      <h2>{isLogin ? "Entrar" : "Cadastrar"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "..." : isLogin ? "Entrar" : "Cadastrar"}
        </button>
      </form>
      <button className="toggle-auth" onClick={() => setIsLogin(v => !v)}>
        {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
      </button>
      {error && <div className="auth-error">{error}</div>}
    </div>
  );
}
