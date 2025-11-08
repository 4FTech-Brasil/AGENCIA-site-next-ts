"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  image: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch("/api/admin/posts/");
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.slug !== slug));
        alert("Post excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      alert("Erro ao excluir post");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark py-20">
        <div className="container mx-auto px-6">
          <div className="text-white text-center">Carregando posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gerenciar Posts MDX</h1>
          <div className="flex gap-2">
            <Link href="/admin/new" className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors">
              Novo Post MDX
            </Link>
            <Link href="/admin/uploads" className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors">
              Gerenciar uploads
            </Link>
          </div>
        </div>

        <div className="bg-brand-gray rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Posts do Blog ({posts.length})</h2>

          {posts.length === 0 ? (
            <p className="text-brand-light-gray text-center py-8">Nenhum post cadastrado. Crie seu primeiro post MDX!</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.slug} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{post.title}</h3>
                    <p className="text-brand-light-gray text-sm mt-1">{post.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-brand-light-gray">
                      <span>Slug: {post.slug}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-brand-blue/20 text-brand-blue rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="px-3 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
