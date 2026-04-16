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
    <div className="task-input-wrapper">
      <span style={{ color: "var(--c-text-muted)", fontSize: "1rem" }}>◇</span>
      <input
        className="task-input"
        type="text"
        placeholder="Digite uma nova tarefa..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn-add" onClick={handleAdd} disabled={loading}>
        {loading ? "..." : "Adicionar"}
      </button>
    </div>
  );
}