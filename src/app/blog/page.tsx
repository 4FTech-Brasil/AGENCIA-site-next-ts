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
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog <span className="text-brand-blue">4FTech</span>
          </h1>
          <p className="text-brand-light-gray text-xl max-w-2xl mx-auto">
            Artigos, dicas e insights sobre marketing digital para impulsionar seu negócio
          </p>
        </div>

        {/* Lista de Posts */}
        <BlogList posts={posts} currentPage={currentPage} totalPages={totalPages} totalPosts={totalPosts} />
      </div>
    </div>
  );
}
