/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), "src", 'content', 'blog-metadata.json');
const blogsDir = path.join(process.cwd(), "src", 'content', 'blogs');

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    readTime: string;
    image: string;
}

export interface BlogPostWithContent extends BlogPost {
    content: string;
}

// Extrai frontmatter de um arquivo MDX
function extractFrontmatter(content: string): Partial<BlogPost> {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = content.match(frontmatterRegex);

    if (!match) return {};

    const frontmatter: any = {};
    const lines = match[1].split('\n');

    lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            let value = valueParts.join(':').trim();

            // Remove aspas
            value = value.replace(/^['"](.*)['"]$/, '$1');

            // Converte arrays
            if (value.startsWith('[') && value.endsWith(']')) {
                try {
                    value = JSON.parse(value);
                } catch {
                    // Mantém como string se não for JSON válido
                }
            }

            frontmatter[key.trim()] = value;
        }
    });

    return frontmatter;
}

// Extrai conteúdo (sem frontmatter)
function extractContent(content: string): string {
    return content.replace(/---\s*[\s\S]*?---/, '').trim();
}

// Gera slug a partir do título
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

// Lê todos os posts
export async function getAllPosts(): Promise<BlogPost[]> {
    const data = fs.readFileSync(postsFilePath, 'utf8');
    const metadata = JSON.parse(data);
    return metadata.posts;
}

// Lê um post específico com conteúdo
export async function getPostWithContent(slug: string): Promise<BlogPostWithContent | null> {
    try {
        // Busca nos metadados
        const allPosts = await getAllPosts();
        const postMetadata = allPosts.find(p => p.slug === slug);

        if (!postMetadata) return null;

        // Lê o conteúdo MDX
        const mdxPath = path.join(blogsDir, `${slug}.mdx`);
        const content = fs.readFileSync(mdxPath, 'utf8');
        const mdxContent = extractContent(content);

        return {
            ...postMetadata,
            content: mdxContent
        };
    } catch (error) {
        console.error('Erro ao ler post:', error);
        return null;
    }
}

// Cria um novo post
export async function createPost(postData: Omit<BlogPost, 'slug' | 'date'> & { content: string }): Promise<BlogPost> {
    const slug = generateSlug(postData.title);
    const date = new Date().toISOString().split('T')[0];

    const newPost: BlogPost = {
        slug,
        title: postData.title,
        description: postData.description,
        date,
        tags: postData.tags,
        readTime: postData.readTime,
        image: postData.image
    };

    // Atualiza metadata
    const allPosts = await getAllPosts();
    allPosts.unshift(newPost);

    fs.writeFileSync(postsFilePath, JSON.stringify({ posts: allPosts }, null, 2));

    // Cria arquivo MDX
    const mdxContent = `---
title: "${postData.title}"
description: "${postData.description}"
date: "${date}"
tags: ${JSON.stringify(postData.tags)}
readTime: "${postData.readTime}"
image: "${postData.image}"
---

${postData.content}
`;

    const mdxPath = path.join(blogsDir, `${slug}.mdx`);
    fs.writeFileSync(mdxPath, mdxContent);

    return newPost;
}

// Atualiza um post existente
export async function updatePost(slug: string, postData: Omit<BlogPost, 'slug' | 'date'> & { content: string }): Promise<BlogPost | null> {
    const allPosts = await getAllPosts();
    const postIndex = allPosts.findIndex(p => p.slug === slug);

    if (postIndex === -1) return null;

    const updatedPost: BlogPost = {
        slug, // Mantém o slug original
        title: postData.title,
        description: postData.description,
        date: allPosts[postIndex].date, // Mantém a data original
        tags: postData.tags,
        readTime: postData.readTime,
        image: postData.image
    };

    // Atualiza metadata
    allPosts[postIndex] = updatedPost;
    fs.writeFileSync(postsFilePath, JSON.stringify({ posts: allPosts }, null, 2));

    // Atualiza arquivo MDX
    const mdxContent = `---
title: "${postData.title}"
description: "${postData.description}"
date: "${updatedPost.date}"
tags: ${JSON.stringify(postData.tags)}
readTime: "${postData.readTime}"
image: "${postData.image}"
---

${postData.content}
`;

    const mdxPath = path.join(blogsDir, `${slug}.mdx`);
    fs.writeFileSync(mdxPath, mdxContent);

    return updatedPost;
}

// Exclui um post
export async function deletePost(slug: string): Promise<boolean> {
    try {
        const allPosts = await getAllPosts();
        const filteredPosts = allPosts.filter(p => p.slug !== slug);

        // Atualiza metadata
        fs.writeFileSync(postsFilePath, JSON.stringify({ posts: filteredPosts }, null, 2));

        // Exclui arquivo MDX
        const mdxPath = path.join(blogsDir, `${slug}.mdx`);
        if (fs.existsSync(mdxPath)) {
            fs.unlinkSync(mdxPath);
        }

        return true;
    } catch (error) {
        console.error('Erro ao excluir post:', error);
        return false;
    }
}