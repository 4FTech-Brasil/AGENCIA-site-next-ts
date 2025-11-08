import { Metadata } from "next";
import BlogList, { BlogPost } from "./components/BlogList";

export const metadata: Metadata = {
  title: "Blog - 4FTech",
  description: "Artigos sobre marketing digital, redes sociais e estratégias de crescimento",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

// Busca os dados no servidor
async function getBlogPosts(
  page: number = 1,
  limit: number = 6
): Promise<{ posts: BlogPost[]; currentPage: number; totalPages: number; totalPosts: number }> {
  const metadata = await import("@/content/blog-metadata.json");
  const posts: BlogPost[] = metadata.posts as unknown as BlogPost[];

  // Ordena por data (mais recente primeiro)
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Paginação
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts: BlogPost[] = sortedPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPosts: posts.length,
    totalPages: Math.ceil(posts.length / limit),
    currentPage: page,
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  // DESESTRUTURAÇÃO COM AWAIT
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");
  const { posts, totalPosts, totalPages } = await getBlogPosts(currentPage);

  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="relative text-center mb-16 py-12 overflow-hidden">
        {/* Elementos de fundo decorativos */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark opacity-90"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-brand-blue/80 text-sm font-medium mb-6 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            CONHECIMENTO EM PRIMEIRA MÃO
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Blog <span className="bg-gradient-to-r from-brand-blue to-cyan-400 bg-clip-text text-transparent animate-gradient">4FTech</span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-brand-light-gray leading-relaxed mb-6">
              Descubra <span className="text-white font-semibold">artigos exclusivos</span>,
              <span className="text-white font-semibold"> dicas estratégicas</span> e{" "}
              <span className="text-white font-semibold">insights valiosos</span> para transformar seu marketing digital
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Conteúdo atualizado semanalmente
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        {/* Lista de Posts */}
        <BlogList posts={posts} currentPage={currentPage} totalPages={totalPages} totalPosts={totalPosts} />
      </div>
    </div>
  );
}
