import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-bold text-white mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h3>,
    p: ({ children }) => <p className="text-brand-light-gray text-lg leading-relaxed mb-4">{children}</p>,
    ul: ({ children }) => <ul className="text-brand-light-gray text-lg list-disc list-inside mb-4 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="text-brand-light-gray text-lg list-decimal list-inside mb-4 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="text-brand-light-gray">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-blue pl-4 my-6 italic text-brand-light-gray bg-brand-blue/5 py-2 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return <code className="bg-gray-800 text-brand-blue px-2 py-1 rounded text-sm">{children}</code>;
      }
      return (
        <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto my-6 border border-gray-700">
          <code className={className}>{children}</code>
        </pre>
      );
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-brand-blue hover:text-cyan-400 underline transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => <Image src={src} alt={alt} className="rounded-lg my-6 w-full max-w-2xl mx-auto shadow-lg" />,
    ...components,
  };
}
