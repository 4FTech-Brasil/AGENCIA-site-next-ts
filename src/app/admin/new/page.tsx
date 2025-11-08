"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface BlogPostWithContent {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  image: string;
  content: string;
}

export default function NovoPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
    readTime: "5 min",
    image: "/images/blog/default.jpg",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      });

      if (response.ok) {
        alert("Post atualizado com sucesso!");
        router.push("/admin");
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao cadastrar post");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Novo Post MDX</h1>

        <form onSubmit={handleSubmit} className="bg-brand-gray rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-white mb-2">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Conteúdo MDX
              <span className="text-brand-light-gray text-sm ml-2">(Suporta markdown e componentes React)</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={20}
              placeholder="# Título&#10;&#10;Escreva seu conteúdo em **MDX** aqui...&#10;&#10;```javascript&#10;console.log('Código destacado');&#10;```"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Tags (separadas por vírgula)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="marketing, digital, estratégia"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Tempo de Leitura</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">URL da Imagem</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Criando..." : "Novo Post"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>

            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Visualizar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
