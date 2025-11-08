"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  image: string;
}

export interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export default function BlogList({ posts, currentPage, totalPages, totalPosts }: BlogListProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/blog?page=${newPage}`);
  };

  return (
    <div>
      {/* Contador de posts */}
      <div className="text-brand-light-gray mb-8 flex items-center gap-2">
        {totalPosts === 0 ? (
          "Nenhum artigo encontrado"
        ) : (
          <>
            <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm">
              {(currentPage - 1) * 6 + 1}-{Math.min(currentPage * 6, totalPosts)} de {totalPosts} {totalPosts === 1 ? "artigo" : "artigos"}
            </span>
            {totalPages > 1 && (
              <>
                <span>•</span>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* Grid de Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="bg-brand-gray rounded-2xl overflow-hidden shadow-lg hover:shadow-brand-blue/20 transition-all duration-300 hover:scale-105 border border-gray-800">
                {/* Imagem */}
                <div className="h-48 bg-gradient-to-br from-brand-blue/20 to-cyan-400/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-brand-light-gray mb-3">
                    <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">{post.title}</h2>

                  <p className="text-brand-light-gray mb-4 line-clamp-3">{post.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-brand-gray text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue transition-colors"
          >
            Anterior
          </button>

          <span className="text-brand-light-gray">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-brand-gray text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue transition-colors"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
