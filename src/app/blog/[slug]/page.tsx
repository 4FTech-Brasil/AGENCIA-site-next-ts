/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Componentes customizados para MDX
const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-white mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="text-brand-light-gray text-lg leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="text-brand-light-gray text-lg list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="text-brand-light-gray text-lg list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-brand-light-gray" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-brand-blue pl-4 my-6 italic text-brand-light-gray bg-brand-blue/5 py-2 rounded-r-lg" {...props} />
  ),
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) {
      return <code className="bg-gray-800 text-brand-blue px-2 py-1 rounded text-sm" {...props} />;
    }
    return (
      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto my-6 border border-gray-700">
        <code {...props} />
      </pre>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: (props: any) => (
    <a
      {...props}
      className="text-brand-blue hover:text-cyan-400 underline transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => <Image {...props} className="rounded-lg my-6 w-full max-w-2xl mx-auto shadow-lg" />,
};

export async function generateStaticParams() {
  const metadata = await import("@/content/blog-metadata.json");
  return metadata.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await import("@/content/blog-metadata.json");
  const post = metadata.posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Não Encontrado - 4FTech",
    };
  }

  return {
    title: `${post.title} - 4FTech Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

async function getPostContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "src", "content", "blogs", `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf8");

    // Remove o frontmatter para o MDXRemote
    const contentWithoutFrontmatter = source.replace(/---\s*[\s\S]*?---/, "").trim();
    return contentWithoutFrontmatter;
  } catch (error) {
    console.error(`Erro ao ler o arquivo do post: ${slug}`, error);
    return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const metadata = await import("@/content/blog-metadata.json");
  const post = metadata.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const mdxContent = await getPostContent(slug);

  if (!mdxContent) {
    // Fallback: mostra apenas os metadados
    return (
      <div className="min-h-screen bg-brand-dark py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-invert prose-lg max-w-none">
            <header className="text-center mb-12 border-b border-gray-800 pb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
              <p className="text-xl text-brand-light-gray mb-6 leading-relaxed">{post.description}</p>

              <div className="flex flex-wrap justify-center items-center gap-4 text-brand-light-gray mb-6">
                <time className="flex items-center gap-2">
                  <CalendarIcon />
                  {new Date(post.date).toLocaleDateString("pt-BR")}
                </time>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <ClockIcon />
                  {post.readTime} de leitura
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm hover:bg-brand-blue/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="bg-brand-gray rounded-2xl p-8 text-center">
              <p className="text-brand-light-gray text-lg">O conteúdo deste post está sendo preparado. Em breve estará disponível.</p>
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-800">
              <div className="bg-brand-gray rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Gostou do conteúdo?</h3>
                <p className="text-brand-light-gray mb-4">
                  Compartilhe com sua rede ou entre em contato para conversarmos sobre como aplicar essas estratégias no seu negócio.
                </p>
                <a
                  href="/contato"
                  className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors"
                >
                  Falar com Especialista
                </a>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <article className="prose prose-invert prose-lg max-w-none">
          <header className="text-center mb-12 border-b border-gray-800 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
            <p className="text-xl text-brand-light-gray mb-6 leading-relaxed">{post.description}</p>

            <div className="flex flex-wrap justify-center items-center gap-4 text-brand-light-gray mb-6">
              <time className="flex items-center gap-2">
                <CalendarIcon />
                {new Date(post.date).toLocaleDateString("pt-BR")}
              </time>
              <span>•</span>
              <span className="flex items-center gap-2">
                <ClockIcon />
                {post.readTime} de leitura
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm hover:bg-brand-blue/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Conteúdo MDX com next-mdx-remote */}
          <div className="mt-8">
            <MDXRemote source={mdxContent} components={mdxComponents} />
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-800">
            <div className="bg-brand-gray rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Gostou do conteúdo?</h3>
              <p className="text-brand-light-gray mb-4">
                Compartilhe com sua rede ou entre em contato para conversarmos sobre como aplicar essas estratégias no seu negócio.
              </p>
              <a
                href="/contato"
                className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors"
              >
                Falar com Especialista
              </a>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

// Ícones auxiliares (mantenha os mesmos)
// Ícones auxiliares
function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
