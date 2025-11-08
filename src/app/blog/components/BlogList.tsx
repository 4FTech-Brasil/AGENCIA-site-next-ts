"use client";
import Image from "next/image";
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
              <div className="bg-brand-gray rounded-2xl overflow-hidden shadow-lg hover:shadow-brand-blue/20 transition-all duration-300 hover:scale-105 border border-gray-800 h-full flex flex-col">
                {/* Container da Imagem */}
                <div className="relative h-48 w-full overflow-hidden">
                  {post.image && post.image !== "/images/blog/default.jpg" ? (
                    <>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                      />
                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Efeito de brilho no hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </>
                  ) : (
                    // Fallback quando não há imagem
                    <div className="h-full w-full bg-gradient-to-br from-brand-blue/20 via-purple-500/20 to-cyan-400/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-brand-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {/* Efeito animado no fallback */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                    </div>
                  )}

                  {/* Badge de tempo de leitura sobre a imagem */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">{post.readTime}</div>

                  {/* Efeito de overlay no hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-brand-light-gray mb-3">
                    <time className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(post.date).toLocaleDateString("pt-BR")}
                    </time>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors duration-300 line-clamp-2 leading-tight">
                    {post.title}
                  </h2>

                  <p className="text-brand-light-gray mb-4 line-clamp-3 flex-1 leading-relaxed">{post.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700/50">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs rounded-full hover:bg-brand-blue/20 transition-colors duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">+{post.tags.length - 3}</span>
                    )}
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
            className="px-6 py-3 bg-brand-gray text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue transition-all duration-300 border border-gray-700 hover:border-brand-blue/50 font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
              .map((page, index, array) => (
                <div key={page} className="flex items-center">
                  {index > 0 && array[index - 1] !== page - 1 && <span className="text-brand-light-gray mx-2">...</span>}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-all duration-300 font-medium ${
                      currentPage === page
                        ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                        : "bg-brand-gray text-brand-light-gray hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                </div>
              ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-3 bg-brand-gray text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue transition-all duration-300 border border-gray-700 hover:border-brand-blue/50 font-medium flex items-center gap-2"
          >
            Próxima
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
