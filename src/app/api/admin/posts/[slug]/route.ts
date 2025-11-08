import { NextRequest, NextResponse } from 'next/server';
import { getPostWithContent, updatePost, deletePost } from '@/lib/mdx-utils';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET - Buscar post específico
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params; // AWAIT no params
        const post = await getPostWithContent(slug);

        if (!post) {
            return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Erro ao carregar post:', error);
        return NextResponse.json({ error: 'Erro ao carregar post' }, { status: 500 });
    }
}

// PUT - Atualizar post
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params; // AWAIT no params
        const body = await request.json();

        const updatedPost = await updatePost(slug, {
            title: body.title,
            description: body.description,
            content: body.content,
            tags: body.tags,
            readTime: body.readTime,
            image: body.image
        });

        if (!updatedPost) {
            return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 500 });
    }
}

// DELETE - Excluir post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params; // AWAIT no params
        const success = await deletePost(slug);

        if (!success) {
            return NextResponse.json({ error: 'Erro ao excluir post' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro ao excluir post:', error);
        return NextResponse.json({ error: 'Erro ao excluir post' }, { status: 500 });
    }
}