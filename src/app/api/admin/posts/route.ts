import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/mdx-utils';

// GET - Listar todos os posts
export async function GET() {
    try {
        const posts = await getAllPosts();
        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        return NextResponse.json({ error: 'Erro ao carregar posts' }, { status: 500 });
    }
}

// POST - Criar novo post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newPost = await createPost({
            title: body.title,
            description: body.description,
            content: body.content,
            tags: body.tags,
            readTime: body.readTime,
            image: body.image
        });

        return NextResponse.json({ success: true, post: newPost });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        return NextResponse.json({ error: 'Erro ao criar post' }, { status: 500 });
    }
}